const express = require("express");
const bodyParser = require("body-parser");
const {postUser, patchUser, deleteUser, getUser, listUser} = require('./controllers');
const {verifyAuthorization, globalErrorHandler} = require('./middleware');
const dotenv = require('dotenv')
dotenv.config({path: require('find-config')('.env')});

const port = process.env.PORT || 3000
const makeCallback =  require('./express-callback');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(verifyAuthorization);
app.use(globalErrorHandler);

const apiRoot = process.env.API_ROOT

app.post(`${apiRoot}/users`, makeCallback(postUser));
app.patch(`${apiRoot}/users/:id`, makeCallback(patchUser));
app.delete(`${apiRoot}/users/:id`, makeCallback(deleteUser));
app.get(`${apiRoot}/users/:id`, makeCallback(getUser));
app.get(`${apiRoot}/users`, makeCallback(listUser));

app.listen(port, ()=>{console.log("app is running")});


