const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001; // Port number for the server

// Enable CORS
app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bokuram@2005', // Replace with your database password
  database: 'new_db' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define a route to fetch driver data
app.get('/data', (req, res) => {
  db.query('SELECT * FROM driver_schedule', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});

// Define a route to fetch conductor data
app.get('/data1', (req, res) => {
  db.query('SELECT * FROM conductor_schedule', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});

app.get('/data3', (req, res) => {
  db.query('SELECT * FROM new_schedule', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});

app.get('/data4', (req, res) => {
  db.query('SELECT * FROM top_50_drivers', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});
app.get('/data5', (req, res) => {
  db.query('SELECT * FROM top_50_conductors', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
