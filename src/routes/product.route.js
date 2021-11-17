const express = require('express');
const { createProduct, getAll, getById, deleteProduct, updateProduct, getProductsByType } = require('../controllers/product.controller');
const { AUTH_INTERCEPTOR } = require('../interceptors/auth.interceptor');
const router = express.Router();




router.get('/api/products', [AUTH_INTERCEPTOR], getAll);
router.get('/api/products/:id', [AUTH_INTERCEPTOR], getById);
router.post('/api/products', [AUTH_INTERCEPTOR], createProduct);
router.put('/api/products/:id', [AUTH_INTERCEPTOR], updateProduct);
router.delete('/api/products/:id', [AUTH_INTERCEPTOR], deleteProduct);
router.get('/api/product/by-type/:type', [AUTH_INTERCEPTOR], getProductsByType)


module.exports = router;