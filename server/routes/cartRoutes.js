import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getCartProducts, addToCart, removeAllFromCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', protect, getCartProducts)
router.post('/', protect, addToCart);
router.delete('/', protect, removeAllFromCart);
router.put('/:id', protect, updateQuantity);

export default router;