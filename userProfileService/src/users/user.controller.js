const { response, json } = require('express');
const express = require('express');
const logger = require('../_helpers/logger');
const router = express.Router();
const userService = require('./user.service');
const verifyAuthorization = require("_helpers/verify-authorization");

// routes
// TODO: which options is the route going to be provide? create, update, delete, retrieve?
// router.post('/register', register);
// router.get('/', getAll);
// router.post('/', create);
router.get('/:id', verifyAuthorization, getById);
router.put('/:id', verifyAuthorization, update);
// router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getByUserId(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    logger.info("update user request : " +  JSON.stringify(req.body))
    userService.update(req.params.id, req.body)
        .then(() => {
            logger.info("the user has been updated successfuly.");
            res.json({});
        })
        .catch(err => next(err));
}

function create(req, res, next) {
    logger.info("create user request : " +  JSON.stringify(req.body))
    userService.create(req.body)
        .then(() => {
            logger.info("New user has been created successfuly.")
            res.json({})
        })
        .catch(err => next(err));
}

function _delete(req, res, next) {
    logger.info("delete user request : " +  JSON.stringify(req.params.id))
    userService.delete(req.params.id)
        .then(() =>{
            logger.info( req.params.id + " user has been removed successfuly.")
            res.json({})
        })
        .catch(err => next(err));
}