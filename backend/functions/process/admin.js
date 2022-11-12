const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bwi-1024-default-rtdb.firebaseio.com",
    storageBucket: "bwi-1024.appspot.com"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();
const adminName = "Ribin APP";
const projectId = serviceAccount.project_id;
const webApiKey = "AIzaSyBQBiaWHAeAoAMTtlFCPuF_BjEk7RrHKFw";
const currencyCode = "INR";

const dynamicLinkInfo = {
  domainUriPrefix: 'https://website1024.estore.business/share',
  deepLinkURL: 'https://website1024.estore.business/voucher',
  androidPackageName: 'com.app.ribin',
  iosBundleId: 'com.app.ribin'
}
const timeZone = 'Asia/Kolkata';
module.exports = {
  admin,
  db,
  bucket,
  adminName,
  projectId,
  dynamicLinkInfo,
  timeZone,
  webApiKey,
  currencyCode
}