const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json()); // Middleware

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "telemedicine"
});

// Endpoint to handle doctor registration
app.post("/post-doctor", (req, res) => {
  const { staffNumber, doctor_name, doctor_password } = req.body;
  //check whether the staff number exists;
  const checkStaff= "SELECT * FROM doctors where staffNumber = ?";
  db.query(checkStaff, [staffNumber], (checkErr, checkRes)=>{
    if(checkErr){
        return res.status(500).json({ error: "Error checking whether staff Number Exists" });
    }
    if(checkRes.length >0) { //Staff Number already exists
        return res.status(400).json({msg:"Staff Number already Exixts"});
    } //else insert
 
  // Insert data into the database
  const sql = "INSERT INTO doctors (staffNumber, doctor_name, doctor_password) VALUES (?, ?, ?)";
  db.query(sql, [staffNumber, doctor_name, doctor_password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error inserting data into database" });
    }
    return res.status(200).json({ message: "Doctor registered successfully" });
  });
});
});// Endpoint to retrieve a doctor based on staff number
app.get("/get-doctor", (req, res) => {
  const staffNumber = req.query.staffNumber;

  // Validate staffNumber
  if (!staffNumber || !/^\d{6}$/.test(staffNumber)) {
    return res.status(400).json({ error: "Invalid staff number" });
  }

  // Fetch doctor from the database based on staff number
  const sql = "SELECT * FROM doctors WHERE staffNumber = ?";
  db.query(sql, [staffNumber], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching doctor details from database" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    return res.status(200).json(data[0]); // Return the first doctor found (assuming staff numbers are unique)
  });
});


app.listen(8081, () => {
  console.log("Listening...");
});
