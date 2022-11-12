const functions = require("firebase-functions");
require("firebase-functions/lib/logger/compat");
const {
    db
} = require('./admin');

exports.onCreateVednor = functions.firestore.document('vendors/{vendorId}').onCreate(async (snap, context) => {
    const vendorData = snap.data();
    const vendorId = context.params.vendorId;
    console.log('onCreateVednor-log vendorData', vendorData);
    console.log('onCreateVednor-log vendorId', vendorId);
    
    if(vendorData.isInMostPopular){
        await db.collection('settings').doc('mostpopular').collection('vendors').doc(vendorId).set(vendorData);
    }
    if(vendorData.isInRecommendation){
        await db.collection('settings').doc('recommendation').collection('vendors').doc(vendorId).set(vendorData);
    }
});

exports.onUpdateVednor = functions.firestore.document('vendors/{vendorId}').onUpdate(async (change, context) => {
    const oldVendorData = change.before.data();
    const newVendorData = change.after.data();
    const vendorId = context.params.vendorId;
    console.log('onUpdateVednor-log vendorData', newVendorData);
    console.log('onUpdateVednor-log vendorId', vendorId);
    
    if(newVendorData.isInMostPopular){
        await db.collection('settings').doc('mostpopular').collection('vendors').doc(vendorId).set(newVendorData);
    }
    if(oldVendorData.isInMostPopular && !newVendorData.isInMostPopular){
        await db.collection('settings').doc('mostpopular').collection('vendors').doc(vendorId).delete();
    }

    if(newVendorData.isInRecommendation){
        await db.collection('settings').doc('recommendation').collection('vendors').doc(vendorId).set(newVendorData);
    }
    if(oldVendorData.isInRecommendation && !newVendorData.isInRecommendation){
        await db.collection('settings').doc('recommendation').collection('vendors').doc(vendorId).delete();
    }
});