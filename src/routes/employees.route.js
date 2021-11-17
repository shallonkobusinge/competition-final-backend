const express = require('express');
const { getAll, getById, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employees.controller');

const { AUTH_INTERCEPTOR } = require('../interceptors/auth.interceptor');
const router = express.Router();


router.get('/api/employees', [AUTH_INTERCEPTOR], getAll);
router.get('/api/employees/:id', [AUTH_INTERCEPTOR], getById);
router.post('/api/employees', [AUTH_INTERCEPTOR], createEmployee);
router.put('/api/employees/:id', [AUTH_INTERCEPTOR], updateEmployee);
router.delete('/api/employees/:id', [AUTH_INTERCEPTOR], deleteEmployee);




module.exports = router;
