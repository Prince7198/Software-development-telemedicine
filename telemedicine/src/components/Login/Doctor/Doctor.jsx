import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';


const Doctor = () => {
  const [staffNumber, setStaffNumber] = useState('');
  const [password, setPassword] =useState('');

  const navigate=useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();

    
    //validate the data
    if(!Number(staffNumber)|| staffNumber.length != 6 || password.length< 1){
      alert("Invalid Details!!");
      return;
    }
    //let get the data from the database
    axios.get(`http://localhost:8081/get-doctor?staffNumber=${staffNumber}`, {
    })
    .then(response => {
      const doctor=response.data;
      if(!doctor){//Empty response
        alert("Doctor not found!!");
        return;
      }
      
       // Check if the password matches
      if (doctor.doctor_password !== password.toString()) {
        alert("Incorrect password. Try again! ");
        return;
      }
       // store patient to keep track of logged in patient 
      localStorage.setItem('doctor', staffNumber);
      alert("Login Successful");
      navigate("/doctor-dashboard");

    })
    .catch(error =>{
      if(error.response && error.response.status === 404){
      alert("Doctor not Found !!");
      }
      if(error.response && error.response.status === 400){
        alert("Something went wrong. Please try again later!");
        }

    });


  };
  return (
    <div className='dbody'>
       <h1 className='dtitle'>Doctor Login</h1>
       <form className="dform" onSubmit={handleSubmit} >
        <label htmlFor="input">Staff Number</label><br /> <br />
        <input type="text" value={staffNumber} onChange={(e)=> setStaffNumber(e.target.value)} placeholder='Enter your Staff Number' id='staffnumber' required /><br /><br />
        <label htmlFor="input">Password</label><br /> <br />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'  required /> <br /><br />
        <button className='dbtnSubmit' type="submit" >Login</button>
       </form> 
     
       <div className="dsignup">
    
        <p style={{color:"white"}}>Don't have an account? </p> &nbsp; <Link to="/doctor-register"><u> Sign up</u> </Link></div>     

    </div>
  )
}

export default Doctor