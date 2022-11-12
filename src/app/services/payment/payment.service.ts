import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AllInOneSDK } from '@awesome-cordova-plugins/all-in-one-sdk/ngx';

interface TxnTokenRes {
    txnToken: string, 
    merchantId: string, 
    isProduction: boolean,
    callbackUrl: string
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(
        private afs: AngularFirestore,
        private allInOneSDK: AllInOneSDK,
        private angularFns: AngularFireFunctions) { }

    async payWithPaytm(data: {docId: string, amount: number, collection: string, uid: string}) {
        return new Promise(async (resolve) => {
            try {
                const getPaytmInitiateTxnToken = this.angularFns.httpsCallable('payments-getPaytmInitiateTxnToken');
                const body = {
                    orderId: data.docId, 
                    uid: data.uid,
                    amount: data.amount.toFixed(2)
                }
                const txnTokenRes: TxnTokenRes = await getPaytmInitiateTxnToken(body).pipe(first()).toPromise();
 
                let paymentIntent = { 
                    mid: txnTokenRes.merchantId, 
                    txnToken: txnTokenRes.txnToken, 
                    isStaging: !txnTokenRes.isProduction, 
                    callbackUrl: txnTokenRes.callbackUrl, 
                    orderId: data.docId, 
                    amount: data.amount.toFixed(2), 
                    restrictAppInvoke: true
                }
                this.allInOneSDK.startTransaction(paymentIntent)
                    .then(async (res: any) => {
                        await this.afs.doc(`${data.collection}/${data.docId}`).update({
                            'payment.status': this.getPaymentStatus(res),
                            'payment.details': JSON.parse(res.response)
                        });
                        resolve(true);
                    })
                    .catch(async (error: any) => {
                        await this.afs.doc(`${data.collection}/${data.docId}`).update({'payment.status': 'failed'});
                        resolve(false);
                    });
            } catch (error) {
                await this.afs.doc(`${data.collection}/${data.docId}`).update({'payment.status': 'failed'});
                resolve(false);
            }
        });
    }

    getPaymentStatus(txnRes) {
        let paymentStatus = '';
        switch (JSON.parse(txnRes.response).STATUS) {
            case 'TXN_SUCCESS':
                paymentStatus = 'successful'
                break;
            case 'TXN_FAILURE':
                paymentStatus = 'failed'
                break;
            case 'NO_RECORD_FOUND':
                paymentStatus = 'pending'
                break;
            case 'PENDING':
                paymentStatus = 'pending'
                break;
        }
        return paymentStatus;
    }

}