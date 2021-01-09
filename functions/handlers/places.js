const {db} = require('../util/admin')

exports.listPlace = (req, res) => {

    let newPlace = {
        owner: req.user.uid,
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        governorate: req.body.governorate,
        rooms: req.body.rooms,
        price: req.body.price,
        university: req.body.university,
        size: req.body.size,
        createdAt: new Date().toISOString()
    }

    db
    .collection('places')
    .add(newPlace)
    .then(doc => {
        return res.status(200).json({message: req.user});
    }) .catch(e => {
        console.error(e);
        res.status(500).json({error: e.code});
    })
}
// TODO
// exports.getUserPlaces = (req, res) => {
//     db.collection('places')
//     .where('owner', '==', req.params.userId)
//     .orderBy('createdAt', 'desc')
//     .get()
//     .then(data => {
//         let places = []
//         data.forEach(doc => {
//             places.push(doc.data());
//         })
//         return res.status(200).json({places});
//     }) .catch(e => {
//         console.error(e);
//         return res.status(500).json({error: e.code()});
//     })
// }

exports.getFilteredPlaces = (req, res) => {
    // const mep = {
    //     governorate: "==",
    //     rooms: "==",
    //     size: "==",
    //     price: "==",
    //     university: "==",
    // }
    // if(req.query.governorate == "0") mep.governorate = '"!="';
    // if(req.query.rooms == "0") mep.rooms = "!=";
    // if(req.query.size == "0") mep.size = "!=";
    // if(req.query.price == "0") mep.price = "!=";
    // if(req.query.university == "0") mep.university = "!=";
    // console.log(mep.governorate);
    db.collection('places')
    // .where('governorate', mep.governorate, req.query.governorate)
    // .where('rooms', mep.rooms, req.query.rooms)
    // .where('size', mep.size, req.query.size)
    // .where('price', mep.price, req.query.price)
    // .where('university', mep.university, req.query.university)
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let places = [];
        data.forEach(doc => {
            places.push({
                ...doc.data(),
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