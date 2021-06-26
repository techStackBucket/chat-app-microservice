require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("_helpers/error-handler");
const verifyAuthorization = require("_helpers/verify-authorization");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));

// check the user got authorization on authentication service
app.use(verifyAuthorization);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});