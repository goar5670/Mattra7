const { admin, db } = require('./admin')

module.exports = (req, res, next) => {
    let userToken;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        userToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        console.error('No Token found');
        return res.status(403).json({error: "Unauthorized"});
    }
    admin.auth().verifyIdToken(userToken)
    .then(decodedToken => {
        req.user = decodedToken;
        return db.doc(`/users/${req.user.uid}`).get();
    })
    .then(() => {
        return next();
    }) .catch(e => {
        console.error(e);
        return res.status(403).json({error: e});
    })
}