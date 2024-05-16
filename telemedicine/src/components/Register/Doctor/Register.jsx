import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // render

//configure customized Alert

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Register() {
  const [staffNumber, setStaffNumber] = useState('');
  const [staffNames, setStaffNames] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffCPassword, setStaffCPassword] = useState('');
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [msg1, setMsg1] = useState("");
  const [err1, setErr1] = useState("");   
  const [success, setSuccess] =useState("");
  

 //custom Alert config
 const customAlert = (message, severity) => {
  return (
      <Collapse in={open}>
          <Alert
              action={
                  <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                          setOpen(false);
                      }}
                  >
                      <CloseIcon fontSize="inherit" />
                  </IconButton>
              }
              severity={severity}
              sx={{ mb: 2 }}
          >
              {message}
          </Alert>
      </Collapse>
  );
};

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    //invalid Staff Number
    if(staffNumber.length != 6 || !Number(staffNumber)){
      setMsg1(" Invalid Staff Number. Valid staff Number has 6 digits");
      setErr1('info');
      setOpen(true);
      return;
    }
    // Check if passwords match
    if (staffPassword !== staffCPassword) {
      setMsg1(" Passwords did not Match!!");
      setErr1('error');
      setOpen(true);
      return;
    }
    // If passwords match, proceed with the API call
    axios.post('http://localhost:8081/post-doctor', {
      staffNumber: staffNumber,
      doctor_name: staffNames,
      doctor_password: staffPassword,
      doctor_email: email,
    })
    .then(res => {
      
      
      setStaffNumber('');
      setStaffNames('');
      setEmail(""); 
      setStaffPassword('');
      setStaffCPassword('');
      setSuccess(true);

    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        setMsg1("Staff number already exists. Please enter a different one.");        
        setErr1('info');
        setOpen(true);
      } else {
        console.log(err);
      }
    });
  
};

  return (
    <div className='drbody'>
      <div>
        <h1 className='drtitle'>Doctor Registration</h1>
        {customAlert(msg1, err1)}
        {
                success &&(
                    <div className="success-popup">
                        <div className="success-content">
                            <div className="icon">
                                <CheckCircleIcon />
                            </div>
                            <p>Success</p><br />
                            <a href="/doctor-login">Proceed to Login</a>
                           
                        </div>
                    </div>
                )}        
        
        <form className="drform" onSubmit={handleSubmit}>
          <label htmlFor="staffnumber">Staff Number</label><br /><br />
          <input type="text" placeholder='Enter your Staff Number' id='staffnumber' value={staffNumber} onChange={(e) => setStaffNumber(e.target.value)} required /><br /><br />
          <label htmlFor="staffnames">Full Names</label><br /><br />
          <input type="text" placeholder='Enter your Full Names' id='staffnames' value={staffNames} onChange={(e) => setStaffNames(e.target.value)} required /> <br /><br />
          <label htmlFor="staffnames">Email</label><br /><br />
          <input type="email" placeholder='Enter your Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required /> <br /><br />
          
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
