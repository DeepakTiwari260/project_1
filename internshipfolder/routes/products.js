const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { protect, admin } = require('../middleware/authMiddleware');
const cloudinary = require('../../config/cloudinary');
const multer = require('multer');

// Temporary local storage for multer
const upload = multer({ dest: 'uploads/' });

// GET all products - Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product - Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create product - Admin only
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: result.secure_url,
      category: req.body.category,
      stock: req.body.stock
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update product - Admin only
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.stock = req.body.stock || product.stock;

      const updated = await product.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE product - Admin only
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne(); // PDF ke purane .remove() ko update kiya gaya hai modern Mongoose ke liye
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;