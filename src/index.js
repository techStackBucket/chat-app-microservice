const express = require("express");
const bodyParser = require("body-parser");
const {postUser, patchUser} = require('./controllers');
const dotenv = require('dotenv');
dotenv.config();

const makeCallback =  require('./express-callback');
const app = express();

app.use(bodyParser.json());

const apiRoot = process.env.API_ROOT
console.log(apiRoot);

app.post(`${apiRoot}/users`, makeCallback(postUser));
app.patch(`${apiRoot}/users/:id`, makeCallback(patchUser));

app.listen(3000, ()=>{console.log("app is running")});


