const functions = require("firebase-functions");
const Paytm = require('paytmchecksum');
const https = require('https');

const { 
    db,
    currencyCode
 } = require('./admin');

async function getPaytmCred() {
    return new Promise(async (resolve) => {
        const paymentRef = await db.collection('payment').doc('paytm').get();
        resolve(paymentRef.data());
    });
}

exports.getPaytmInitiateTxnToken = functions.https.onCall(async (data, context) => {

    const paytmCred = await getPaytmCred();

    const apiData = {
        merchantId: paytmCred.merchantId,
        key: paytmCred.key,
        isProduction: paytmCred.isProduction,
        websiteName: paytmCred.website,
        orderId: data.orderId,
        uid: data.uid,
        amount: data.amount
    }
    const txnTokenRes = await getTxnToken(apiData);
    return { 
        txnToken: txnTokenRes.txnToken, 
        merchantId: paytmCred.merchantId,
        isProduction: paytmCred.isProduction,
        callbackUrl: txnTokenRes.callbackUrl
    };
});

async function getTxnToken(data) {
  return new Promise(resolve => {
    try {
      const paytmParams = {};
      paytmParams.body = {
        "requestType": "Payment",
        "mid": data.merchantId,
        "websiteName": data.websiteName,
        "orderId": data.orderId,
        "callbackUrl": `https://${data.isProduction ? 'securegw' : 'securegw-stage'}.paytm.in/theia/paytmCallback?ORDER_ID=${data.orderId}`,
        "txnAmount": {
          "value": data.amount,
          "currency": currencyCode,
        },
        "userInfo": {
          "custId": data.uid,
        },
      };
      Paytm.generateSignature(JSON.stringify(paytmParams.body), data.key).then(function (checksum) {
        paytmParams.head = {
          "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {
          hostname: data.isProduction ? 'securegw.paytm.in' : 'securegw-stage.paytm.in',
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${data.merchantId}&orderId=${data.orderId}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
          }
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on('data', function (chunk) {
            response += chunk;
          });

          post_res.on('end', function () {
            console.log('Response: ', response);
            resolve({
              txnToken: JSON.parse(response).body.txnToken,
              callbackUrl: paytmParams.body.callbackUrl
            });
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
    } catch (error) {
      console.log(error);
      resolve({
        txnToken: '',
        callbackUrl: ''
      });
    }
  });
}

async function checkStatusOfPendingVouchers() {
    const pendingVouchersRef = await db.collection('vouchers')
    .where("payment.isInitiated", '==', true)
    .where("payment.status", '==', 'pending')
    .get();
    const pendingVouchers = [];
    pendingVouchersRef.forEach(doc => {
        if(doc && doc.id) {
            pendingVouchers.push({id: doc.id, ...doc.data()});
        }
    });
    if(pendingVouchers.length) {
        for (const voucher of pendingVouchers) {
            console.log('voucher id', voucher.id);
            const statusRes = await getPaymentStatus({
                voucherId: voucher.id,
                ...voucher.payment
            });
            console.log('statusRes', statusRes);
            await db.collection('vouchers').doc(voucher.id).update({
                'payment.status': statusRes.status,
                'payment.details': statusRes.txnDetails,
            });
        }
    }
    return;
}

async function getPaymentStatus(data) {
    return new Promise(async (resolve) => {
        let statusObj = {};
        if(data.mode === 'paytm') {
            statusObj = await getPaytmPaymentStatus(data)
        }
        resolve(statusObj);
    })
}

async function getPaytmPaymentStatus(data) {
    return new Promise(async (resolve) => {
        const paytmCred = await getPaytmCred();
        const paytmParams = {};
        paytmParams.body = {
            "mid" : paytmCred.merchantId,
            "orderId" : data.orderId,
        };

        Paytm.generateSignature(JSON.stringify(paytmParams.body), paytmCred.key).then(function(checksum){
            console.log('checksum', checksum);
            paytmParams.head = {
                "signature"	: checksum
            };
            var post_data = JSON.stringify(paytmParams);
        
            var options = {
                hostname: paytmCred.isProduction ? 'securegw.paytm.in' : 'securegw-stage.paytm.in',
                port: 443,
                path: '/v3/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            var response = "";
            var post_req = https.request(options, function(post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });
        
                post_res.on('end', function(){
                    console.log('Response: ', response);
                    const txnStatus = JSON.parse(response).body.resultInfo.resultStatus;
                    const txnDetails = JSON.parse(response).body;
                    let systemStatus = '';
                    switch (txnStatus) {
                        case 'TXN_SUCCESS':
                            systemStatus = 'successful'
                            break;
                        case 'TXN_FAILURE':
                            systemStatus = 'failed'
                            break;
                        case 'NO_RECORD_FOUND':
                            systemStatus = 'pending'
                            break;
                        case 'PENDING':
                            systemStatus = 'pending'
                            break;
                    }
                    resolve({
                        status: systemStatus,
                        txnDetails
                    });
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    });
}

module.exports.checkStatusOfPendingVouchers = async function () {
    await checkStatusOfPendingVouchers();
}


