const express = require("express");
const bodyParser = require("body-parser");
const {postUser, patchUser, deleteUser, getUser, listUser} = require('./controllers');
const dotenv = require('dotenv');
dotenv.config();

const makeCallback =  require('./express-callback');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const apiRoot = process.env.API_ROOT
console.log(apiRoot);

app.post(`${apiRoot}/users`, makeCallback(postUser));
app.patch(`${apiRoot}/users/:id`, makeCallback(patchUser));
app.delete(`${apiRoot}/users/:id`, makeCallback(deleteUser));
app.get(`${apiRoot}/users/:id`, makeCallback(getUser));
app.get(`${apiRoot}/users`, makeCallback(listUser));

app.listen(3000, ()=>{console.log("app is running")});


