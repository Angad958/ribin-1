const functions = require("firebase-functions");
const request = require('request');
const {
    db,
    dynamicLinkInfo,
    webApiKey
} = require('./admin');

exports.onCreateVoucher = functions.firestore.document('vouchers/{voucherId}').onCreate(async (snap, context) => {
    const voucher = snap.data();
    const voucherId = context.params.voucherId;
    const dynamicLink = await createDynamicLink(voucherId);
    await db.collection('vouchers').doc(voucherId).update({
        dynamicLink: dynamicLink.shortLink
    });
});

async function createDynamicLink(voucherId) {
    return new Promise(async (resolve, reject) => {

        const body = {
            'dynamicLinkInfo': {
                'domainUriPrefix': dynamicLinkInfo.domainUriPrefix,
                'link': `${dynamicLinkInfo.deepLinkURL}/${voucherId}/`,
                "androidInfo": {
                    "androidPackageName": dynamicLinkInfo.androidPackageName
                },
                "iosInfo": {
                    "iosBundleId": dynamicLinkInfo.iosBundleId
                }
            }
        }
        request({
            url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${webApiKey}`,
            method: 'POST',
            json: true,
            body
        }, async function (error, response) {
            let shortLink = '';
            if (error) {
                console.log('Error :', error)
            } else {
                if (response && response.statusCode !== 200) {
                    console.log('Error on Request :', response.body.error.message)
                } else {
                    shortLink = response.body.shortLink; 
                }
            }
            resolve({shortLink})
        });
    })
}