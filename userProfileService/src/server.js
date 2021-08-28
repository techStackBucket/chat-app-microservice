require("rootpath")();
const path = require('path');
const express = require("express");
require('dotenv').config({path : path.resolve(__dirname , '.env')});
const logger = require("_helpers/logger");
const app = express();
const cors = require("cors");
const errorHandler = require("_helpers/error-handler");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// api base route
var apiRoot = process.env.API_ROOT || '/api/v1';

// api routes
app.use(apiRoot + '/users', require('./users/user.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    logger.info('Server listening on port ' + port)
});