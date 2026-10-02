const express = require('express');
const router=express.Router();
const controller=require('../controllers/controllers');
router.get('/products', controller.getProducts);

router.get('/products/:id', controller.getProductById);
router.get('/products',controller.createProduct);
router.put('/products/:id',controller.updateProduct);
router.patch('/products/:id', controller.patchProduct);
router.delete('/products/:id', controller.deleteProduct);

module.exports=router