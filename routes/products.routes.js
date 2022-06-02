// post.routes.js

const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);

router.get('/product/random', ProductController.getRandom);

router.get('/product/:id', ProductController.getById);

router.post('/products', ProductController.post);

router.put('/products/:id', ProductController.put);

router.delete('/products/:id', ProductController.delete);

module.exports = router;
