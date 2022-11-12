const functions = require("firebase-functions");
const FieldValue = require('firebase-admin').firestore.FieldValue;
const {
    db
} = require('./admin');

exports.onCreateTransaction = functions.firestore.document('transactions/{transactionId}').onCreate(async (snap, context) => {
    const txnData = snap.data();
    const txnId = context.params.transactionId;
    console.log('amount', txnData.amount);
    console.log('id', txnData.voucher.id)
    await db.collection('vouchers').doc(txnData.voucher.id).update({
        remainingBalance: FieldValue.increment(-txnData.amount)
    });
    console.log('complete');
});