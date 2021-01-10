const functions = require('firebase-functions');

const app = require('express')();

const {
    signup,
    login,
    getUserDetails,
    updateUserInfo,
    getAuthUser
} = require('./handlers/user');

const {
    listPlace,
    getFilteredPlaces,
    deletePlace,
    getOnePlace,
    updatePlace
} = require('./handlers/places');

const FBAuth = require('./util/fbAuth')
const cors = require('cors')


app.use(cors());

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user/:userId', getUserDetails)
app.get('/user', FBAuth, getAuthUser)
app.post('/user', FBAuth, updateUserInfo)

//Place routes
app.post('/places', FBAuth, listPlace);
app.get('/places', getFilteredPlaces);
app.delete('/places/:placeId', FBAuth, deletePlace);
app.get('/places/:placeId', getOnePlace);
app.post('/places/:placeId', FBAuth, updatePlace);

exports.api = functions.region('europe-west').https.onRequest(app);