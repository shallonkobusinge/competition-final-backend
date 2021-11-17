const express = require('express');
const { getAll, getById, create, update, deleting } = require('../controllers/users.controller');
const { AUTH_INTERCEPTOR } = require('../interceptors/auth.interceptor');
const router = express.Router();


router.get('/api/users', [AUTH_INTERCEPTOR], getAll);
router.get('/api/users/:id', [AUTH_INTERCEPTOR], getById);
router.post('/api/users', create);
router.put('/api/users/:id', [AUTH_INTERCEPTOR], update);
router.delete('/api/users/:id', [AUTH_INTERCEPTOR], deleting);


module.exports = router;