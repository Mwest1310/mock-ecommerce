import express from 'express';
import { findProduct, createProduct, findAllProducts, searchProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', findAllProducts)
router.get('/:id', findProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;