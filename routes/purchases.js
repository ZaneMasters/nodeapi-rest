import express from 'express';
import { createPurchase, getPurchases, getPurchaseHistory } from '../controllers/purchaseController.js';
import { isClient } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isClient, createPurchase);
router.get('/', getPurchases);
router.get('/history/:userId', isClient, getPurchaseHistory);

export default router;
