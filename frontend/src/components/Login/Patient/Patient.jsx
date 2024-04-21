import React from 'react';
import "./Patient.css";
import { Link } from 'react-router-dom';


const Patient = () => {
  return (
    <div className='pbody'>
       <h1 className='ptitle'>Patient Login</h1>
       <form className="pform" >
        <label htmlFor="input-button">Username</label><br /> <br />
        <input type="text" placeholder='Enter your Username' id='patientusername' required /><br /><br />
        <label htmlFor="input-button">Password</label><br /> <br />
        <input type="password" placeholder='Enter your Password'  required /> <br /><br /><br />
        <button className='pbtnSubmit' type="submit" >Login</button>
       </form> 
       <div className="psignup">
        <p >Don't have an account? </p> &nbsp; <Link to="/patient-register"><u> Sign up</u> </Link></div>     

    </div>
  )
}

export default Patient