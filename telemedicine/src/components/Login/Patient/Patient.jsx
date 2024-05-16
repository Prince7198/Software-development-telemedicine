import React ,{useState} from 'react';
import "./Patient.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//customize the alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Patient = () => {
  const [patientUsername, setPatientUserName] = useState('');
  const [password, setPassword] =useState('');

  const navigate=useNavigate();

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

  
  const handleSubmit = (e)=>{
    e.preventDefault();
    //validate the data
    if(patientUsername.length < 3 ){
      setMsg1("Invalid Details supplied!!");
      setErr1("error");
      setOpen(true);
      return;
    }
    //let get the data from the database
    axios.get(`http://localhost:8081/get-patient?patientUsername=${patientUsername}`, {
    })
    .then(response => {
      const patient=response.data;
      if(!patient){//Empty response
        console.log("Patient not found!!");
        return;
      }
       // Check if the password matches
      if (patient.password !== password.toString()) {
        setMsg1("Incorrect Details. Try again! ");
        setErr1("error");
        setOpen(true);
        return;
      }
  
      // store patient to keep track of logged in patient 
      localStorage.setItem('patient', patientUsername)
      navigate("/patient-dashboard");
    })
    .catch(error =>{
      
      setMsg1("Invalid Details. Try again!");
      setErr1("error");
      setOpen(true);

    });

  }
  return (
    <div className='pbody'>
       <h1 className='ptitle'>Patient Login</h1>
       {customAlert(msg1, err1)}
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