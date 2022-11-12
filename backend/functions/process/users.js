const functions = require("firebase-functions");
const {
    db
} = require('./admin');


exports.createUser = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const name = user.displayName ? user.displayName : 'user';
    const email = user.email ? user.email : '';
    const phoneNo = user.phoneNumber ? user.phoneNumber : '';
    const userObj = {
        name: name,
        email: email,
        phoneNo: phoneNo,
        createdAt: new Date(),
        lastAccessAt: new Date(),
        active: true,
        role: 'user',
        dP: '/assets/img/profile-pic.png',
    }
    await db.collection('users').doc(uid).set(userObj);
});