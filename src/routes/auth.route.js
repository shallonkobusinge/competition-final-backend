const express = require('express');
const router = express.Router();
const { getCurrentUser, login } = require('../controllers/auth.controller');


router.post('/api/auth/login', login);
router.get('/api/auth/current-user', getCurrentUser);

module.exports = router;