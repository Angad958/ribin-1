// const functions = require("firebase-functions");
// const paymentsFile = require('./payments');
// const { 
//     timeZone
//  } = require('./admin');

// exports.voucherScheduler = functions.pubsub.schedule('* * * * *').timeZone(timeZone).onRun(async (context) => {
//     try {
        // await paymentsFile.checkStatusOfPendingVouchers();
//     } catch (error) {
//         console.log(error);
//     }
// });