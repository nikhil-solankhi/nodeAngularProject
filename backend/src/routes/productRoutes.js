const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

// Example usage for admin-only route
router.get('/admin', authMiddleware.verifyTokenAndRole('admin'), productController.getAllProducts);
router.get('/pro', productController.getAllProducts);

module.exports = router;
