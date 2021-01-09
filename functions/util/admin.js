const admin = require('firebase-admin')
const config = require('./config')

var serviceAccount = require('path-key/serviceAccountKey.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.storageBucket
});

const db = admin.firestore();


module.exports = {admin, db}