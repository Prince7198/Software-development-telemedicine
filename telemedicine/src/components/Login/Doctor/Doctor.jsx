import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

//configure customized Alert
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Doctor = () => {
  const [staffNumber, setStaffNumber] = useState('');
  const [password, setPassword] =useState('');
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

  const navigate=useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();

    
    //validate the data
    if(!Number(staffNumber)|| staffNumber.length != 6 || password.length< 1){
      setMsg1(" Invalid Details");
      setErr1('error');
      setOpen(true);
      return;
    }
    //let get the data from the database
    axios.get(`http://localhost:8081/get-doctor?staffNumber=${staffNumber}`, {
    })
    .then(response => {
      const doctor=response.data;
      if(!doctor){//Empty response
        console.log("Doctor not found!!");
        return;
      }
      
       // Check if the password matches
      if (doctor.doctor_password !== password.toString()) {
        setMsg1(" Invalid password. Try again!");
        setErr1('error');
        setOpen(true);
        
        return;
      }
       // store patient to keep track of logged in patient 
      localStorage.setItem('doctor', staffNumber);
      
      navigate("/doctor-dashboard");

    })
    .catch(error =>{
      if(error.response && error.response.status === 404){
      console.log("Doctor not Found !!");
      }
      if(error.response && error.response.status === 400){
        setMsg1(" Something went wrong. Please try again later!");
        setErr1('info');
        setOpen(true);
        
        }

    });


  };
  return (
    <div className='dbody'>
       <h1 className='dtitle'>Doctor Login</h1>
       {customAlert(msg1, err1)}
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