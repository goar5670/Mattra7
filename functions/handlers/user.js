const {admin, db} = require('../util/admin')

const config = require('../util/config')
const { v4: uuid_v4 } = require('uuid');

const firebase = require('firebase')
firebase.initializeApp(config)

const {
    validateSignupData,
    validateLoginData
} = require('../util/validators')
const { user } = require('firebase-functions/lib/providers/auth')

exports.signup = (req, res) => {
    const newUser = req.body;
    const { valid, errors } = validateSignupData(newUser);
    if(!valid) return res.status(400).json(errors)

    const noImg = 'no-img.png'

    let userToken;
    let userId;
    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then(token => {
        userToken = token;
        const userCredentials = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            imageUrl:`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        }
        return db.doc(`/users/${userId}`).set(userCredentials);
    })
    .then(() => {
        return res.status(201).json({token: userToken});
    }) .catch(e => {
        console.error(e);
        if(e.code === 'auth/email-already-in-use') {
            errors.email = "Email is already taken";
            return res.status(400).json(errors)
        }
        return res.status(500).json({error: e.code});
    })
}

exports.login = (req, res) => {
    const { valid, errors } = validateLoginData(req.body);
    if(!valid) return res.status(400).json(errors);

    return firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return res.json({token});
    }) .catch(e => {
        console.error(e);
        return res.status(403).json({general: "Wrong credentials, please try again"});
    })
}

exports.getUserDetails = (req, res) => {
    let userDetails = {};
    db.doc(`/users/${req.params.userId}`).get()
    .then(doc => {
        if(!doc.exists) return res.status(404).json({error: "User not found"});
        else
        {
            userDetails = doc.data();
            userDetails.userId = req.params.userId
            return db
            .collection('places')
            .where('owner', '==', req.params.userId)
            .orderBy('createdAt', 'desc')
            .get();
        }
    })
    .then(data => {
        userDetails.places = [];
        data.forEach(doc => {
            userDetails.places.push(
                {
                    ...doc.data(),
                    placeId: doc.id
                }
            )
        })
        return res.status(200).json(userDetails);
    }) .catch(e => {
        console.error(e);
        return res.status(500).json({error: e.code});
    })
}

exports.updatePFP = (req, res) => {
    const BusBoy = require("busboy");
    const path = require('path')
    const os = require('os')
    const fs = require('fs')
    const  busboy = new BusBoy({ headers: req.headers });
    let image = {}, name = "";
    const token = uuid_v4();
    console.log(req.body);
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname, filename, mimetype);
        if(mimetype != 'image/jpeg' && mimetype != 'image/jpg' && mimetype != 'image/png')
            return res.status(403).json({error: "uploaded file is not an image"});
        const ext = filename.split(".")[filename.split(".").length-1];
        name = `${req.user.uid}.${ext}`;
        const filepath = path.join(os.tmpdir(), name);
        image = {filepath, mimetype};
        file.pipe(fs.createWriteStream(filepath));
    })
    busboy.on('finish', () => {
        admin.storage().bucket().upload(image.filepath, {
            gzip: true,
            resumable: false,
            metadata: {
                metadata: {
                    contentType: image.mimetype,
                    firebaseStorageDownloadTokens: token
                }
            }
        })
        .then(() => {
            const imageUrl =
            `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${name}?alt=media&token=${token}`;
            return db.doc(`/users/${req.user.uid}`).update({imageUrl});
        })
        .then(() => {
            return res.status(200).json({message: "image uploaded successfully"});
        }) .catch(e => {
            console.log(e);
            return res.status(500).json({error: e.code});
        })
    })
    busboy.end(req.rawBody);
}

exports.getAuthUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.uid}`).get()
    .then(doc => {
        if(doc.exists) {
            userData.credentials = doc.data();
            userData.userId = req.user.uid;
            return db.collection('places')
            .where('owner', '==', req.user.uid)
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get();
        }
        else return res.status(404).json({error: "User not found"});
    })
    .then((data) => {
        userData.places = [];
        data.forEach(doc => {
            userData.places.push(doc.data());
        })
        return res.json(userData);
    }) .catch(e => {
        console.error(e);
        return res.status(500).json({error: e.code});
    })
}

exports.updateUserInfo = (req, res) => {
    let userDocument = db.doc(`/users/${req.user.uid}`)
    userDocument.update(req.body)
    .then(() => {
        return res.json({message: "User info updated successfully"});
    }) .catch(e => {
        console.error(e);
        return res.status(500).json({error: e.code});
    })
}
