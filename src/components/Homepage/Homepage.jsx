import React from 'react'
import "./Homepage.css";
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='homepage' >
        <Header />
        <div className="buttons">
        <Link to="/doctor-login" className='doctor-login'>Doctor Login</Link> <br /> <br /><br /><br />
        <Link to="/patient-login"  className='patient-login'>Patient Login</Link> 
      </div>    
    </div>
  )
}

export default Homepage