import React ,{useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import "./Register.css";
import axios from 'axios';
import { RadioGroup } from '@mui/material';


const Register = () => {

  //useNavigate
  const navigate =useNavigate();

  //registration
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [gender, setGender] = useState('');
  
  //handle Gender
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  
  //onsubmit
  const handleClick=(e) =>{
    //prevent default
    e.preventDefault();

    
    
    if(!phone ||  !/^\d{11}$/.test(phone)){
      alert("Invalid Phone Number");
      return;
    }
    if(!age || age>100 || age<0){
      alert("Invalid Age");
      return;
    }
    if(password != cpassword){
      alert("Password Mismatch!");
      return;
    }
    axios.post('http://localhost:8081/post-patient',{
      username:username,
      fullname: fullname,
      phone: phone,
      age:age,
      password: password,
      gender:gender,
      email:email,
    })
    .then(result =>{
      alert("Patient has been created Successfully");
      navigate("/patient-login");
    }).catch(error=>{
      if(error.response && error.response.status === 400){
        alert("Username is already taken. Please try another one. ")
        return;
      }
      alert("Something went wrong. Please try again Later");
      return;
    });    
  }
  return (
    <div className='prbody'>
       <h1 className='prtitle'>Patient Register</h1>
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
          <input type="number" placeholder='Enter your Phone Number' value={phone} onChange={(e)=>{setPhone(e.target.value)}}  required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Email</label><br /> <br />
          <input type="text" placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Age</label><br /> <br />
          <input type="number" placeholder='Enter your Age' value={age} onChange={(e)=>{setAge(e.target.value)}} required /> <br /><br />
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
        <button className='prbtnSubmit' type="submit" >Register</button>
        </div>
        
       </form> 
       <div className="prsignup">
        <p >Already have an account? </p> &nbsp; <Link to="/patient-login"><u> Log in</u> </Link></div>     

    </div>
  )
}

export default Register