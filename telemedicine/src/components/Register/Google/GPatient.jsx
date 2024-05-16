import React, { useState, useEffect } from 'react';
import "./GPatient.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const GPatient = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [dob, setDob] = useState("");     
    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [open, setOpen] = useState(false);
    const [repo, setRepo] = useState("");
    const [sev,setSev] = useState("");    
    const [success, setSuccess] = useState(false);
    

    const navigate = useNavigate();
    const pp = "temporal";
    

    useEffect(() => {
        
        // get  the pending user 
        axios.get(`http://localhost:8081/get-patient?patientUsername=${pp}`)
            .then(res => {
                const _patient = res.data;
                setEmail(_patient.patient_email);
                setFullname(_patient.patient_name);
            })
            .catch(error => {
                console.log(error);
            });

    }, [navigate]);

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
    

    //handle Gender
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleClick = (e) => {
        //prevent default
        e.preventDefault();
    
        document.getElementById('congrat').style.display='none';
        // compute age 
        const current_date = new Date();
        const yob = new Date(dob)
        const a_ge = current_date.getFullYear() - yob.getFullYear();
         //the age
    
        if (!phone || phone.length < 8 || phone.length > 15) {
            setRepo("Invalid Phone Number");
            setSev("error");
            setOpen(true);
            return;
        }
        if (!a_ge || a_ge > 150 || a_ge < 0) {
            setRepo("Invalid date of Birth");
            setSev("error");
            setOpen(true);
            return;
        }
        if (password !== cpassword) {
            setRepo("Password Mismatch");
            setSev("error");
            setOpen(true);
            return;
        }
        axios.post('http://localhost:8081/post-patient', {
            username: username,
            fullname: fullname,
            phone: phone,
            age: a_ge,
            password: password,
            gender: gender,
            email: email,
        })
            .then(result => {

                axios.delete(`http://localhost:8081/delete-patient?patientUsername=${pp}`)
                .then(response=>{
                    setSuccess(true);

                }).catch(err=>{
                    console.log(err);
                })
                
                            
            }).catch(error => {
                if (error.response && error.response.status === 400) {
                    setRepo("Username is already taken. Try another one");
                    setSev("warning");
                    setOpen(true);
                    return;
                }
                setRepo("Something went wrong. Please try again Later");
                setSev("error");
                setOpen(true);
                
                return;
            });
    };
    
    return (
        <div className='gbody'>
            <h1 className='gtitle'>Complete Your Profile</h1>

            {customAlert(repo, sev)}

            {
                success &&(
                    <div className="success-popup">
                        <div className="success-content">
                            <div className="icon">
                                <CheckCircleIcon />
                            </div>
                            <p>Success</p><br />
                            <a href="/patient-login">Proceed to Login</a>
                           
                        </div>
                    </div>
                )}

            <h3 className="congrat" id='congrat'> <marquee behavior="smooth" direction="Left">Google Sign on Success !</marquee> </h3>

        <form className="pprform" onSubmit={handleClick}>
        <div className="gridView">
          <div>
          <label htmlFor="input-button">Username</label><br /> <br />
          <input type="text" placeholder='Enter your Username' value={username} onChange={(e)=>{setUsername(e.target.value);}} id='patientusername' required /><br /><br />
          </div>
          
          <div>
          <label htmlFor="input-button">Phone Number</label><br /> <br />
          <div className="input">
            <PhoneInput
              inputStyle={{ height: '40px', border:"1px solid rgb(49, 121, 181)", width:"280px" ,paddingTop:"15px", paddingBottom:"15px", borderRadius:"10px", fontSize: '20px', }} // Custom style for the input
              country={'uk'} // Default country value
              placeholder= "+441234564345"// Value to be  in the 
              onChange={(formattedValue, unformattedValue) => {
                // Update the state with the unformatted phone number
                setPhone(formattedValue);
              }}
              // Callback function to handle input change
            />
          </div>
          </div>
          
          <div>
          <label htmlFor="input-button">Date of Birth</label><br /> <br />
          <input type="date" style={{width:"260px"}} placeholder='Enter your Age' value={dob} onChange={(e)=>{setDob(e.target.value)}} required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Gender</label><br /> <br />
          <div className="radio" >
          <input  type="radio" id="maleRadio"   name="gender"  value="male" checked={gender === 'male'} onChange={handleGenderChange} />
          <label htmlFor="maleRadio"> Male</label> &nbsp; &nbsp;
          <input type="radio" id="femaleRadio" name="gender" value="female"  checked={gender === 'female'} onChange={handleGenderChange} />
      <label htmlFor="femaleRadio"> Female</label>
    
          </div>
          </div>
          <div>
          <label htmlFor="input-button">Password</label><br /> <br />
          <input type="password" placeholder='Enter your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Confirm Password</label><br /> <br />
          <input type="password" placeholder='Confirm your Password' value={cpassword} onChange={(e)=>setCpassword(e.target.value)}  required /> <br /><br />
          </div>
        </div>
        <br />
        <div className="prbtnContainer">
        <button className='prbtnSubmit' type="submit" >Complete</button>
        </div>
        
       </form>      
        
    </div>
  )
}

export default GPatient