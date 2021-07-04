require("rootpath")();
const path = require('path');
const express = require("express");
require('dotenv').config({path : path.resolve(__dirname , '.env')});

const app = express();
const cors = require("cors");
const errorHandler = require("_helpers/error-handler");
const verifyAuthorization = require("_helpers/verify-authorization");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// api base route
var apiRoot = process.env.API_ROOT || '/api/v1';

// api routes
app.use(apiRoot + '/users', require('./users/user.controller'));

// check the user got authorization on authentication service
app.use(verifyAuthorization);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});