import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // render

function Register() {
  const [staffNumber, setStaffNumber] = useState('');
  const [staffNames, setStaffNames] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffCPassword, setStaffCPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    //invalid Staff Number
    if(staffNumber.length != 6 || !Number(staffNumber)){
      alert(" Invalid Staff Number. Valid staff Number has 6 digits");
      return;
    }
    // Check if passwords match
    if (staffPassword !== staffCPassword) {
      alert("Passwords don't match");
      return;
    }
    // If passwords match, proceed with the API call
    axios.post('http://localhost:8081/post-doctor', {
      staffNumber: staffNumber,
      doctor_name: staffNames,
      doctor_password: staffPassword,
    })
    .then(res => {
      
      alert("Doctor has been registered Successfully. Proceed to Login");
      setStaffNumber('');
      setStaffNames('');
      setStaffPassword('');
      setStaffCPassword('');
      navigate('/doctor-login');

    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        alert("Staff number already exists. Please choose a different one.");
      } else {
        console.log(err);
      }
    });
  }

  return (
    <div className='drbody'>
      <div>
        <h1 className='drtitle'>Doctor Registration</h1>
        <form className="drform" onSubmit={handleSubmit}>
          <label htmlFor="staffnumber">Staff Number</label><br /><br />
          <input type="text" placeholder='Enter your Staff Number' id='staffnumber' value={staffNumber} onChange={(e) => setStaffNumber(e.target.value)} required /><br /><br />
          <label htmlFor="staffnames">Full Names</label><br /><br />
          <input type="text" placeholder='Enter your Full Names' id='staffnames' value={staffNames} onChange={(e) => setStaffNames(e.target.value)} required /> <br /><br />
          <label htmlFor="staffpassword">Staff Password</label><br /><br />
          <input type="password" placeholder='Enter your Password' id='staffpassword' value={staffPassword} onChange={(e) => setStaffPassword(e.target.value)} required /><br /><br />
          <label htmlFor="staffcpassword">Confirm Password</label><br /><br />
          <input type="password" placeholder='Confirm your Password' id='staffcpassword' value={staffCPassword} onChange={(e) => setStaffCPassword(e.target.value)} required /> <br /><br /><br />
          <button className='drbtnSubmit' type="submit">Submit</button>
        </form>
      </div>
      <div className="drsignup">
        <p >Already have an account? </p> &nbsp;<Link to="/doctor-login" className='dr-link'><u> Log in</u> </Link>
      </div>     

    </div>
  );
}

export default Register;
