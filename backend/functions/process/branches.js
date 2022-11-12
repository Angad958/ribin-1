const functions = require("firebase-functions");
const FieldValue = require('firebase-admin').firestore.FieldValue;
const {
    db
} = require('./admin');

exports.onCreateBranch = functions.firestore.document('vendors/{vendorId}/branches/{branchId}').onCreate(async (snap, context) => {
    const branchData = snap.data();
    const vendorId = context.params.vendorId;
    const branchId = context.params.branchId;
    await db.collection('users').doc(branchData.assignedUser.id).update({
        'assignedBranch':branchId,
        'assignedVendor':vendorId,
        'role':'vendor'
    });
});

exports.onUpdateBranch = functions.firestore.document('vendors/{vendorId}/branches/{branchId}').onUpdate(async (change, context) => {
    const branchData = change.after.data();
    const vendorId = context.params.vendorId;
    const branchId = context.params.branchId;
    await db.collection('users').doc(branchData.assignedUser.id).update({
        'assignedBranch':branchId,
        'assignedVendor':vendorId,
        'role':'vendor'
    });
});