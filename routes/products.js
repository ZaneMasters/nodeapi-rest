import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', isAdmin, createProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

export default router;
