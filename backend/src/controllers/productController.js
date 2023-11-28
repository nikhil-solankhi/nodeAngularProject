// controllers/productController.js
const db = require('../db'); // Import your MySQL connection

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).send('Error on the server.');
    }

    res.status(200).send(results);
  });
};

exports.getProductById = (req, res) => {
  const productId = req.params.id;

  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      res.status(500).send('Error on the server.');
    }

    if (results.length > 0) {
      res.status(200).send(results[0]);
    } else {
      res.status(404).send('Product not found');
    }
  });
};

exports.addProduct = (req, res) => {
  const { name, price, category } = req.body;

  db.query('INSERT INTO products (name, price, category) VALUES (?, ?, ?)', [name, price, category], (err, results) => {
    if (err) {
      res.status(500).send('Error on the server.');
    }

    res.status(201).send('Product added successfully.');
  });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, price, category } = req.body;

  db.query('UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?', [name, price, category, productId], (err, results) => {
    if (err) {
      res.status(500).send('Error on the server.');
    }

    res.status(200).send('Product updated successfully.');
  });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  db.query('DELETE FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      res.status(500).send('Error on the server.');
    }

    res.status(200).send('Product deleted successfully.');
  });
};
