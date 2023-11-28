const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Import your MySQL connection

const secretKey = 'your_secret_key'; // Replace with your actual secret key

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      res.status(500).send('Error on the server.');
    }

    if (results.length > 0) {
      const user = results[0];

      bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
        if (bcryptRes) {
          const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
            expiresIn: 60, 
          });

          res.status(200).send({ auth: true, token, role: user.role });
        } else {
          res.status(401).send('Invalid password');
        }
      });
    } else {
      res.status(404).send('User not found');
    }
  });
};

exports.signup = (req, res) => {
    const { username, password, role } = req.body;
  
    // Check if the username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        res.status(500).send('Error on the server.');
      }
  
      if (results.length > 0) {
        res.status(409).send('Username already exists');
      } else {
        // Hash the password
        bcrypt.hash(password, 10, (hashErr, hash) => {
          if (hashErr) {
            res.status(500).send('Error hashing password.');
          } else {
            // Insert the new user into the database
            db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hash, role || 'user'], (insertErr, insertResult) => {
              if (insertErr) {
                res.status(500).send('Error creating user.');
              } else {
                res.status(201).send('User created successfully.');
              }
            });
          }
        });
      }
    });
  };