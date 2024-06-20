import { Purchase, PurchaseItem } from '../models/purchase.js';
import Product from '../models/product.js';
import User from '../models/user.js';

const createPurchase = async (req, res) => {
  const { userId, products } = req.body;

  try {
    const totalPrice = products.reduce((acc, p) => acc + (p.quantity * p.price), 0);

    const purchase = await Purchase.create({ userId, date: new Date(), totalPrice });

    for (const product of products) {
      await PurchaseItem.create({
        purchaseId: purchase.id,
        productId: product.productId,
        quantity: product.quantity,
        price: product.price
      });
    }

    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      include: [
        { model: PurchaseItem, include: [Product] },
        { model: User, attributes: ['username'] }
      ]
    });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPurchaseHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const purchases = await Purchase.findAll({
      where: { userId },
      include: [{ model: PurchaseItem, include: [Product] }]
    });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPurchase, getPurchases, getPurchaseHistory };
