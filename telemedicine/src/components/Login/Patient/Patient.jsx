import React ,{useState} from 'react';
import "./Patient.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Patient = () => {
  const [patientUsername, setPatientUserName] = useState('');
  const [password, setPassword] =useState('');

  const navigate=useNavigate();

  
  const handleSubmit = (e)=>{
    e.preventDefault();
    //validate the data
    if(patientUsername.length < 3 ){
      alert("Invalid Details supplied!!");
      return;
    }
    //let get the data from the database
    axios.get(`http://localhost:8081/get-patient?patientUsername=${patientUsername}`, {
    })
    .then(response => {
      const patient=response.data;
      if(!patient){//Empty response
        alert("Patient not found!!");
        return;
      }
       // Check if the password matches
      if (patient.password !== password.toString()) {
        alert("Incorrect Details. Try again! ");
        return;
      }
      alert("Login Successful");
      // store patient to keep track of logged in patient 
      localStorage.setItem('patient', patientUsername)
      navigate("/patient-dashboard");
    })
    .catch(error =>{
      if(error.response && error.response.status === 404){
      alert("Patient not Found!!");
      }
      if(error.response && error.response.status === 400){
        alert("Something went wrong. Please try again later!");
        }

    });

  }
  return (
    <div className='pbody'>
       <h1 className='ptitle'>Patient Login</h1>
       <form className="pform" onSubmit={handleSubmit}>
        <label htmlFor="input-button">Username</label><br /> <br />
        <input type="text" placeholder='Enter your Username' id='patientusername' value={patientUsername} onChange={(e) => setPatientUserName(e.target.value)} required /><br /><br />
        <label htmlFor="input-button">Password</label><br /> <br />
        <input type="password" placeholder='Enter your Password'  required value={password} onChange={(e)=>setPassword(e.target.value)} /> <br /><br /><br />
        <button className='pbtnSubmit' type="submit" >Login</button>
       </form> 
             
       <div className="psignup">
        <p >Don't have an account? </p> &nbsp; <Link to="/patient-register"><u> Sign up</u> </Link></div>     
          
      
    </div>
  )
}

export default Patient