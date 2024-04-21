import React from 'react'
import { Link } from 'react-router-dom'
import "./Register.css"
const Register = () => {
  return (
    <div className='prbody'>
       <h1 className='prtitle'>Patient Register</h1>
       <form className="prform" >
        <div className="gridView">
          <div>
          <label htmlFor="input-button">Username</label><br /> <br />
          <input type="text" placeholder='Enter your Username' id='patientusername' required /><br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Full Names</label><br /> <br />
          <input type="text" placeholder='Enter your Full Names'  required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Phone Number</label><br /> <br />
          <input type="text" placeholder='Enter your Phone Number'  required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Age</label><br /> <br />
          <input type="text" placeholder='Enter your Age'  required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Password</label><br /> <br />
          <input type="password" placeholder='Enter your Password'  required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Confirm Password</label><br /> <br />
          <input type="password" placeholder='Confirm your Password'  required /> <br /><br />
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