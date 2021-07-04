const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
// TODO: which options is the route going to be provide? create, update, delete, retrieve?
// router.post('/register', register);
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
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
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}