const {db, admin} = require('../util/admin')
const { v4: uuid_v4 } = require('uuid');
const config = require('../util/config')


exports.listPlace = (req, res) => {

    let newPlace = {
        pictures: [],
        owner: `${req.user.uid}`,
        createdAt: new Date().toISOString()
    }
    const BusBoy = require("busboy");
    const path = require('path')
    const os = require('os')
    const fs = require('fs')
    const  busboy = new BusBoy({ headers: req.headers });
    //TODO validate place info
    let placeId;
    db.collection('places').add(newPlace)
    .then(doc => {
        placeId = doc.id
    })
    .then(() => {
        let images = [];
        let cnt = 0;
        busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
            if(mimetype != 'image/jpeg' && mimetype != 'image/jpg' && mimetype != 'image/png')
                return res.status(403).json({error: "uploaded file is not an image"});
            const ext = filename.split(".")[filename.split(".").length-1];
            const name = `${placeId}_${cnt}.${ext}`;
            cnt++;
            const filepath = path.join(os.tmpdir(), name);
            file.pipe(fs.createWriteStream(filepath));
            images.push({filepath, name, mimetype})
        })

        busboy.on('field', (fieldname, val) => {
            if(fieldname != 'file')
            {
                newPlace[fieldname] = val;
            }
        })

        busboy.on('finish', () => {
            new Promise((resolve, reject) => {
                let cmt = 0;
                images.forEach((image) => {
                    token = uuid_v4();
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
                        `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${image.name}?alt=media&token=${token}`;
                        if(newPlace.pictures.push(imageUrl))
                        {
                            cmt++;
                            if(cmt == images.length)
                                resolve();
                            
                        }
                    }) .catch(e => {
                        reject(e);
                    })
                })
                if(!images.length)
                    resolve();
            }) .then(() => {
                return db.doc(`/places/${placeId}`).update(newPlace)
                .then(() => {
                    return res.status(201).json({message: "document added successfully"});
                }) .catch(e => {
                    console.error(e);
                })
            })
        })
        busboy.end(req.rawBody);
    }) .catch(e => {
        console.error(e);
        res.status(500).json({error: e.code});
    })
}

exports.getFilteredPlaces = (req, res) => {

    db.collection('places')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let places = [];
        data.forEach(doc => {
            const place = doc.data();
            console.log(place);
            if(
                (req.query.governorate == "0" || req.query.governorate == place.governorate) &&
                (req.query.rooms == "0" || req.query.rooms == place.rooms) &&
                (req.query.size == "0" || req.query.size == place.size) &&
                (req.query.price == "0" || req.query.price == place.price) &&
                (req.query.university == "0" || req.query.university == place.university)
            )
            places.push({
                ...place,
                id: doc.id
            });
        });
        return res.status(200).json({places});
    }).catch(e => {
        console.error(e);
        return res.status(500).json({error: e.code()});
    })
}

exports.deletePlace = (req, res) => {
    const placeDocument = db.doc(`/places/${req.params.placeId}`)
    db.doc(`/users/${req.user.uid}`).get()
    .then(authUser => {
        placeDocument.get()
        .then(doc => {
            if(!doc.exists) return res.status(404).json({error: "Place not found"});
            else
            {
                if(doc.data().owner != authUser.id) 
                    return res.status(403).json({error: "Unauthorized"});
                return placeDocument.delete()
                .then(() => {
                    return res.status(200).json({doc: doc.data()})
                })
            }
        })
    }).catch(e => {
        console.error(e);
        res.status(500).json({error: e.code});
    })
    
}

exports.getOnePlace = (req, res) => {
    db.doc(`/places/${req.params.placeId}`)
    .get()
    .then(doc => {
        if(!doc.exists) return res.status(404).json({error: "Place not found"});
        else
        {
            return res.status(200).json(doc.data());
        }
    }) .catch(e => {
        console.error(e);
        res.status(500).json({error: e.code});
    })
}

exports.updatePlace = (req, res) => {
    let placeDocument = db.doc(`/places/${req.params.placeId}`);

    placeDocument
    .get()
    .then(doc => {
        if(!doc.exists) return res.status(404).json({error: "Place not found"});
        else
        {
            return placeDocument.update(req.body);
        }
    })
    .then(doc => {
        return res.json({message: "Place updated successfully"});
    }) .catch(e => {
        console.error(e)
        return res.status(500).json({error: e.code});
    })
}