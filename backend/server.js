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
  const { staffNumber, doctor_name, doctor_password, doctor_email} = req.body;
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
  const sql = "INSERT INTO doctors (staffNumber, doctor_name, doctor_email, doctor_password) VALUES (?, ?, ?, ?)";
  db.query(sql, [staffNumber, doctor_name, doctor_email, doctor_password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error inserting data into database" });
    }
    return res.status(200).json({ message: "Doctor registered successfully" });
  });
});
});

// Endpoint to retrieve a doctor based on staff number
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
    return res.status(200).json(data[0]); // Return a record
  });
});

//insert a patient.
app.post("/post-patient", (req, res)=>{
  const {username, fullname, phone, age, password,email, gender}=req.body;
  //check the username exists
  const checkUsername = "SELECT * FROM patients WHERE patientUsername = ? ";
  db.query(checkUsername, [username], (unameError, unameRes)=>{
    if(unameError){
      return res.status(500).json({error:"Error Checking Username"});
    }
    if(unameRes.length > 0){// returned a record
      return res.status(400).json({msg:"Username already Exist"});
    }
    // insert the patient
    const insertPatient ="INSERT INTO patients (patientUsername, patient_name, patient_phone, patient_age, password, patient_email, patient_gender) VALUES(?, ?, ?, ?, ?, ?, ?)";
    db.query(insertPatient, [username, fullname, phone, age, password, email, gender], (insertError, insertResult)=>{
      if(insertError){
        return res.status(501).json({error:"Error occurred while inserting the Patient"}+ insertError);
      }
      return res.status(200).json({message:"Patient inserted Successfully"});
    });
  });
});

// Delete a patient.
app.delete("/delete-patient", (req, res) => {
  const username = req.query.patientUsername;
  const delQuery = "DELETE FROM patients WHERE patientUsername = ?";
  db.query(delQuery, [username], (delError, delResult) => {
    if (delError) {
      return res.status(501).json({ error: "Error occurred while deleting the patient", details: delError });
    }
    return res.status(200).json({ message: "Patient deleted successfully" });
  });
});



//login a patient
app.get("/get-patient", (req, res) =>{
  const patientUsername = req.query.patientUsername;
  // Fetch patient from the database based on patientUsername
  const sql = "SELECT * FROM patients WHERE patientUsername = ?";
  db.query(sql, [patientUsername], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching patient details from database" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json(data[0]); // A record is returned.
  });
});
//all doctore
app.get("/all-doctors", (req, res) =>{
  const dquery=" SELECT * FROM doctors";
  db.query(dquery, (error,data)=>{
    if(error){
      console.log("Error: " + error);
      return;
    }
    if(data.length === 0){
      return res.status(404).json({error: "No doctors found!"});
    }
    return res.status(200).json(data);

  
  });
});

//all patients
app.get("/all-patients", (req, res) =>{
  const dquery=" SELECT * FROM patients";
  db.query(dquery, (error,data)=>{
    if(error){
      console.log("Error: " + error);
      return;
    }
    if(data.length === 0){
      return res.status(404).json({error: "No patient found!"});
    }
    return res.status(200).json(data);

  
  });
});

//book appointment
app.post("/patient/book-appointment", (req,res)=>{
  const {patientUsername, patientName,patientEmail, patientAge, patientGender, doctorName,staffNumber, appointmentDate, startTime, endTime} =req.body;
  const status = "pending";
  aquery="INSERT INTO appointments(patientUsername,patientName,patientEmail, PatientAge, patientGender,doctorName,staffNumber, appointmentDate,startTime, endTime,status) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
  db.query(aquery,[patientUsername,patientName,patientEmail,patientAge,patientGender,doctorName,staffNumber, appointmentDate,startTime,endTime,status], (err, data)=>{
    if(err){
      return res.status(500).json({error:"Error occured creating appointment" + err});
    }

    // console.log(data);
    return res.status(200).json(data);
  })
})

//all appointments
app.get("/all-appointments", (req, res)=>{
  apquery="SELECT * FROM appointments";
  db.query(apquery, (error,data)=>{
    if(error){
      return res.status(500).json({error:error});
    }
    return res.status(200).json(data);
  })
})
//patient history
app.get("/patient-history", (req,res)=>{
  const patientUsername=req.query.patientUsername;

  phquery="SELECT * FROM treatment WHERE patientUsername=?";
  db.query(phquery,[patientUsername], (error, data)=>{
    if(error){
      return res.status(404).json({error:"Record not found!!"});

    }
    //data is found
    return res.status(200).json(data);

  })
});

// Doctor's Appointments

app.get("/doctor-appointments", (req, res)=>{
  const staffNumber= req.query.staffNumber;
  apquery="SELECT * FROM appointments where staffNumber=?";
  db.query(apquery,[staffNumber], (error,data)=>{
    if(error){
      return res.status(500).json({error:error});
    }
    return res.status(200).json(data);
  })
})

// Treat the patient

app.get("/sick-patients", (req, res)=>{
  const staffNumber= req.query.staffNumber;
  apquery="SELECT * FROM appointments where staffNumber=?";
  db.query(apquery,[staffNumber], (error,data)=>{
    if(error){
      return res.status(500).json({error:error});
    }
    return res.status(200).json(data);
  })
})

//approve
app.post("/approve", (req, res) => {
  const { appointment_id, meeting } = req.body;
  const status = "approved";
  const aquery = "UPDATE appointments SET status = ?, meeting= ? WHERE appointment_id = ?";
  
  db.query(aquery, [status, meeting, appointment_id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error Approving: " + err });
    }

    // console.log(data);
    return res.status(200).json(data);
  });
});


//reject
app.post("/reject", (req, res) => {
  const { appointment_id } = req.body;
  const status = "rejected";
  const aquery = "UPDATE appointments SET status = ? WHERE appointment_id = ?";
  
  db.query(aquery, [status, appointment_id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error Approving: " + err });
    }

    // console.log(data);
    return res.status(200).json(data);
  });
});


//book appointment
app.post("/treatment", (req,res)=>{
  const {staffNumber, doctorName, patientUsername, patientName,patientAge, patientEmail,dat, symptoms, diagnosis,dose, usage, bill, medicaid} =req.body;
  
  aquery="INSERT INTO treatment(staffNumber, doctorName, patientUsername, patientName, patientAge, patientEmail,dat, symptoms, diagnosis, dose, ussage, bill, medicaid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(aquery, [staffNumber, doctorName, patientUsername, patientName, patientAge,patientEmail, dat, symptoms, diagnosis, dose, usage, bill,medicaid], (err, data)=>{
    if(err){
      return res.status(500).json({error:"Error entering treatment record" + err});
    }

    // console.log(data);
    return res.status(200).json(data);
  })
})

//rating
app.post("/rating", (req, res)=>{
  const {id, review, rating}=req.body;
  //do update
  const queryU="UPDATE treatment SET rating=?, review=? where id=?";
  db.query(queryU, [rating,review,id], (error,data)=>{
    if(error){
      return res.status(500).json({error:"Error Updating rating and Review"});

    }
    return res.status(200).json(data);//on success.
  })
})

//doctor's dashboard ratings
app.get("/doctor-rating", (req, res)=>{
  const staffNumber= req.query.staffNumber;
  //get treatment details based on logged in doctor
  const tquery="SELECT * FROM treatment WHERE staffNumber=?";
  db.query(tquery, [staffNumber], (error,data)=>{
    if(error){
      return res.status(500).json({error: "Error retrieving the Doctor's record"});

    }
    //return data
    return res.status(200).json(data);
  })
})
//post-schedules
app.post("/post-schedule", (req, res)=>{
  const {staffNumber, scheduleDate, startTime, endTime, availability} =req.body;

  querry= "INSERT INTO schedules(staffNumber, scheduleDate, startTime, endTime, availability) VALUES (?,?,?,?,?)";
  db.query(querry, [staffNumber, scheduleDate, startTime, endTime, availability], (err, data)=>{
    if(err){
      console.log(err);
      return res.status(500).json({Error: "Error inserting a Schedule"});
    }
    return res.status(200).json(data);
  })
});

//get schedules
app.get("/get-schedules", (req,res)=>{
  const staffNumber = req.query.staffNumber;
  queryS="SELECT * FROM schedules WHERE staffNumber=?";
  db.query(queryS, [staffNumber], (err, data)=>{
    if(data.length<1){
      return res.status(404).json("No record found!!");
    }
    return res.status(200).json(data);
  })
});
//delete the schedule
app.delete("/del-schedule", (req, res) =>{
  const id = req.query.id;
  const delquery ="DELETE FROM schedules WHERE id=?";
  db.query(delquery, [id], (error, data)=>{
    if(error){
      return res.status(500).json({Error:"An error has occurred!"});
    }
    return res.status(200).json({Message:"Schedule has been successfully deleted"});
  })
});

//get schedule witb ID
app.get("/get-schedle", (req,res)=>{
  const id = req.query.id;
  queryS="SELECT * FROM schedules WHERE id=?";
  db.query(queryS, [id], (err, data)=>{
    if(data.length<1){
      return res.status(404).json("No record found!!");
    }
    return res.status(200).json(data);
  })
});
// booked? make it unavailable
//get schedule witb ID
app.post("/update-schedule", (req,res)=>{
  const id = req.query.id;
  const availability =false;
  queryS="UPDATE schedules SET availability=? WHERE id=?";
  db.query(queryS, [availability,id], (err, data)=>{
    if(data.length<1){
      return res.status(404).json("No record found!!");
    }
    return res.status(200).json(data);
  })
});

app.listen(8081, () => {
  console.log("Listening...");
});
