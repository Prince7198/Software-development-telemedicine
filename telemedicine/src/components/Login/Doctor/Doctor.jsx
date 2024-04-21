import React, { useState } from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Doctor = () => {
  const [staffNumber, setStaffNumber] = useState('');
  const [password, setPassword] =useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();

    
    //validate the data
    if(!Number(staffNumber)|| staffNumber.length != 6 || password.length< 1){
      alert("Wrong Details!!");
    }



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