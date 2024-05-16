import React ,{useState, useEffect} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import "./Register.css";
import axios from 'axios';
import { RadioGroup } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import default styling css

import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';

import { jwtDecode } from "jwt-decode";
//customize the alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 

const Register = () => {
  //useNavigate
  const navigate =useNavigate();
  //registration
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [gender, setGender] = useState('');
  const [googlePatient, setGooglePatient] =useState({});
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



//google sign on

const onSuccess = async (response) => {
  try {
    const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    });
    setGooglePatient(res.data);
  } catch (err) {
    console.log(err);
  }
};

const login = useGoogleLogin({
  onSuccess,
});

useEffect(() => {
  if (! (Object.keys(googlePatient).length ===0)) {
    // Data insertion logic will be executed only when the Google sign-in button is clicked
    const pUsername = "temporal";
    const pEmail = googlePatient.email;
    const pName = googlePatient.name;


    axios.post('http://localhost:8081/post-patient', {
      username: pUsername,
      fullname: pName,
      phone: "",
      age: 0,
      password: "",
      gender: "",
      email: pEmail
    })
      .then(result => {
        
        localStorage.setItem("temporal", "temporal");
        setGooglePatient("");
        navigate("/update-details");
      })
      .catch(error=>{
        console.log(googlePatient);
        if(error.response && error.response.status === 400){
          alert("You have an account created Already, Proceed to Login ");
          return;
        }
        else{
          alert("An Error Occurred!!. Try Later.");
        }
      });
      
      
  }
}, [googlePatient, navigate]);

//end google signin

// normal signup 

  //handle Gender
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  
  //onsubmit
  const handleClick=(e) =>{
    //prevent default
    e.preventDefault(); 
    
    // compute age 
    const current_date= new Date();
    const yob=new Date(dob)
    const a_ge=current_date.getFullYear()-yob.getFullYear();
    setAge(a_ge);//the age

    if(!phone ||  phone.length <8 || phone.length >15){
      setMsg1("Invalid Phone Number");
      setErr1("error");
      setOpen(true);
      return;
    }
    if(!a_ge || a_ge>150 || a_ge<0){
      
      setMsg1("Invalid Age");
      setErr1("error");
      setOpen(true);
      return;
    }
    if(password != cpassword){
      setMsg1("Passwords did not match");
      setErr1("error");
      setOpen(true);
      return;
    }
    setOpen(false);
    axios.post('http://localhost:8081/post-patient',{
      username:username,
      fullname: fullname,
      phone: phone,
      age:a_ge,
      password: password,
      gender:gender,
      email:email,
    })
    .then(result =>{
      
      setSuccess(true);
    }).catch(error=>{
      if(error.response && error.response.status === 400){
        
      setMsg1("Username is already taken. Please try another one.");
      setErr1("error");
      setOpen(true);
        return;
      }
          
      setMsg1("Something went wrong. Please try again Later");
      setErr1("error");
      setOpen(true);

      return;
    });    
  }
  return (
    <div className='prbody'>
       <h1 className='prtitle'>Patient Register</h1>
       {customAlert(msg1, err1)}

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

       <form className="prform" onSubmit={handleClick}>
      
        <div className="gridView">
          <div>
          <label htmlFor="input-button">Username</label><br /> <br />
          <input type="text" placeholder='Enter your Username' value={username} onChange={(e)=>{setUsername(e.target.value);}} id='patientusername' required /><br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Full Names</label><br /> <br />
          <input type="text" placeholder='Enter your Full Names' value={fullname} onChange={(e)=>{setFullname(e.target.value)}}  required /> <br /><br />
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
          <label htmlFor="input-button">Email</label><br /> <br />
          <input type="email" placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required /> <br /><br />
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
        <button className='prbtnSubmit' type="submit" id='register' >Register</button>
        </div>
        
       </form> 
       <button className='googleSignin' onClick={() => login()}> <i><GoogleIcon/></i> &nbsp; &nbsp;<p>Sign in with Google</p> </button>
        
       <div className="prsignup">
        <p >Already have an account? </p> &nbsp; <Link to="/patient-login"><u> Log in</u> </Link></div>     

    </div>
  )
}

export default Register