const functions = require('firebase-functions');
const mysql = require('mysql2');

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',   // e.g., 'localhost' for local, or IP/hostname for cloud
  user: 'root',   // e.g., 'root'
  password: 'bokuram@2005', // your MySQL password
  database: 'new_db',  // the database you want to connect to
  port: 3306                // default MySQL port
};

// Create a MySQL connection
const connection = mysql.createPool(dbConfig);

// Example Cloud Function to query the database
exports.getDataFromMySQL = functions.https.onRequest((req, res) => {
  const query = 'SELECT * FROM new_schedule'; // Replace 'your_table' with your table name
  
  // Perform the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
    } else {
      res.status(200).json(results); // Send results back to the client
    }
  });
});
const dbConfig = {
    host: functions.config().mysql.host,
    user: functions.config().mysql.user,
    password: functions.config().mysql.password,
    database: functions.config().mysql.database,
    port: 3306
  };