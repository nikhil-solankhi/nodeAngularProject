const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import your MySQL connection
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
