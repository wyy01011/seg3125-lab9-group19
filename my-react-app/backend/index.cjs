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

//Code to add the contact message entry into the database table.
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  const createdAt = new Date();

  const sql = "INSERT INTO CONTACTMESSAGE (name, email, message, created_at) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, message, createdAt], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to save message" });
    }
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

//Code to add the user, booking, and payment entries into the database.
app.post("/api/book-event", (req, res) => {
  const { firstName, lastName, phone, eventDate, singerName, pricePerHour } = req.body;
  const today = new Date().toISOString().slice(0, 10);
  const totalAmount = pricePerHour * 4; //Amount is price per hour * hours. Each booking is for 4 hours.

  //Add the user to the users table if it does not exist yet. Check with phone number.
  const userSql = "INSERT INTO USERS (first_name, last_name, phone_number) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE user_id=LAST_INSERT_ID(user_id)";

  // Pass only 3 values to match the 3 (?) in userSql
  db.query(userSql, [firstName, lastName, phone], (err, userResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message, detail: err.sqlMessage });
    }
    const userId = userResult.insertId;

    //Find the singer being used for the booking.
    db.query("SELECT singer_id FROM singers WHERE name = ?", [singerName], (err, singerRows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message, detail: err.sqlMessage });
      }

      if (singerRows.length === 0) {
        console.error("Singer not found for nameKey:", singerName);
        return res.status(500).send("Singer not found");
      }

      const singerId = singerRows[0].singer_id;

      //Add the booking to the booking table.
      const bookingSql = "INSERT INTO booking (event_date, created_at, event_location, user_id, singer_id) VALUES (?, ?, 'Wedding', ?, ?)";
      db.query(bookingSql, [eventDate, today, userId, singerId], (err, bookingResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message, detail: err.sqlMessage });
        }
        const bookingId = bookingResult.insertId;

        //Add the payment to the payment table.
        const paymentSql = "INSERT INTO payment (amount, booking_id) VALUES (?, ?)";
        db.query(paymentSql, [totalAmount, bookingId], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message, detail: err.sqlMessage });
          }
          res.status(200).send({ message: "Booking and Payment Successful" });
        });
      });
    });
  });
});