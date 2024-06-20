import Product from '../models/product.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { batchNumber, name, price, availableQuantity, entryDate } = req.body;

  try {
    const product = await Product.create({ batchNumber, name, price, availableQuantity, entryDate });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { batchNumber, name, price, availableQuantity, entryDate } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.batchNumber = batchNumber;
    product.name = name;
    product.price = price;
    product.availableQuantity = availableQuantity;
    product.entryDate = entryDate;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getAllProducts, createProduct, updateProduct, deleteProduct };
