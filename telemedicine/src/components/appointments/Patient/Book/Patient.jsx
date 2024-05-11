import React, { useState, useEffect } from 'react';
import "./Patient.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';

const Patient = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [doctor, setDoctor] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [tim, setTim] = useState('');
    const [reason, setReason] = useState('');
    const [dat, setDat] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [gender, setGender] = useState('');
    const [doctorName, setDoctorName] =useState('');

    useEffect(() => {
        const loggedPatient = localStorage.getItem("patient");
        if (!loggedPatient) {
            navigate("/home");
        }
        setUsername(loggedPatient);

        axios.get(`http://localhost:8081/get-patient?patientUsername=${loggedPatient}`)
            .then(response => {
                const patient = response.data;
                setFullname(patient.patient_name);
                setAge(patient.patient_age);
                setEmail(patient.patient_email);
                setGender(patient.patient_gender);
                setUsername(patient.patientUsername);
            })
            .catch(error => {
                console.log("Error: " + error);
            });

        axios.get("http://localhost:8081/all-doctors")
            .then(response => {
                setDoctors(response.data);//Array of Doctors
                
            })
            .catch(error => {
                console.log("Error: " + error);
            });

       
    }, [navigate, username]);

    const handleClick = (e) => {
        e.preventDefault();
        
        
        
        // imput validations
        if(doctor.length < 3){
          alert("please select a Doctor");
          return;
        }
        if(reason.length<10){
          alert("The appointment reason must exceed 10 characters");
          document.getElementById("reason").focus();
          return;

        }
         // get doctor name 
        //let get the data from the database
        axios.get(`http://localhost:8081/get-doctor?staffNumber=${doctor}`, {
        })
        .then(response => {
            const dctor=response.data;
            const name_=dctor.doctor_name;
    
       
        //insert the record
        axios.post(`http://localhost:8081/patient/book-appointment?patientUsername=${username}`, {
          patientUsername:username,
          patientName: fullname,
          patientEmail: email,
          patientAge: age,
          patientGender: gender,
          doctorName: name_,
          staffNumber:doctor,
          appointmentDate: dat,
          appointmentTime:tim,
          appointmentReason: reason,

        })
        .then(response=>{
         // console.log(response.data);
          alert("Appointment has been booked succcessfully.");
          //clear the inputs
          setDat("");
          setTim("");
          setReason("");
          setDoctor("");

        });
    });
    }

    return (
        <div className='pabody'>
            <h1 className='paheader'>Patient Appointment</h1>
            <form className="paform" onSubmit={handleClick}>
                <div className="pagridView">
                    <div>
                        <label htmlFor="input-button">Full Names</label><br /> <br />
                        <input type="text" placeholder='Enter your Full Names' value={fullname} onChange={(e) => { setFullname(e.target.value) }} style={{ cursor: "pointer" }} readOnly /> <br /><br />
                    </div>
                    <div>
                        <label htmlFor="input-button">Email</label><br /> <br />
                        <input type="text" placeholder='Enter your Email' value={email} style={{ cursor: "pointer" }} readOnly /> <br /><br />
                    </div>
                    <div>
                        <label htmlFor="input-button">Age</label><br /> <br />
                        <input type="number" placeholder='Enter your Age' value={age} style={{ cursor: "pointer" }} readOnly /> <br /><br />
                    </div>
                    <div>
                        <label htmlFor="input-button">Doctor</label><br /> <br />
                        
                        <select type='select' placeholder="Select a Doctor" value={doctor} onChange={(e)=> setDoctor(e.target.value)}>
                           <option value=""></option>
                            {doctors.map(doctor => (
                                <option key={doctor.staffNumber} value={doctor.staffNumber}>{doctor.doctor_name}</option>
                            ))}
                        </select> <br /><br />
                    </div>
                    <div>
                        <label htmlFor="input-button">Appointment Date</label><br /> <br />
                        <input type="date" value={dat} onChange={(e) => setDat(e.target.value)} style={{ cursor: "pointer", width: "260px" }} required /> <br /><br />
                    </div>
                    <div>
                        <label htmlFor="input-button">Appointment Time</label><br /> <br />
                        <input type="time" style={{ width: "260px" }} value={tim} onChange={(e) => { setTim(e.target.value) }} required /> <br /><br />
                    </div>
                    <div>
                        <label htmlFor="input-button">Appointment Reason </label><br /> <br />
                        <textarea id='reason' cols="25" rows="7" placeholder='Type here ...' value={reason} onChange={(e) => setReason(e.target.value)} required /> <br /><br />
                    </div>
                    <div className="pabtnContainer">
                        <button className='pabtnSubmit' type="submit" >Book Now</button>
                    </div>
                </div>
                <div className="pappointments">
              <Link to="/patient-appointments" className='link'>My appointments&#8594; </Link>
            </div>
                <br />
            </form>
           
        </div>
    )
}

export default Patient;
