const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cheesecake",
  database: "WEDDINGS"
});

db.connect(err => {
  if (err) {
    console.log("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL database: WEDDINGS");
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});