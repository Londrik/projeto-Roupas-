const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Rota para buscar todos os produtos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para buscar um produto por ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
