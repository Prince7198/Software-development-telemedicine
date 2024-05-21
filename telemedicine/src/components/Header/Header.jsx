import React, { useState, useEffect } from 'react';
import logo from "/src/assets/logo.png";
import "./Header.css"
import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [loggedPatient, setLoggedPatient] = useState("");
  const [loggedDoctor, setLoggedDoctor] = useState("");
  const [blog, setBlog] = useState(false);

  useEffect(() => {
    const patient = localStorage.getItem("patient");
    const doctor = localStorage.getItem("doctor");

    if (patient) {
      setLoggedPatient(patient);
    }
    if (doctor) {
      setLoggedDoctor(doctor);
    }
  }, [navigate]);

  const handleClick = () => {
    setClicked(!clicked);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/home');
  }

  return (
    <div className='header'>
      <nav>
        <a href="/home">
          <img src={logo} alt="logo" width={100} height={100} />
        </a>
        <div>
          <ul id='navbar' className={clicked ? "#navbar active" : "#navbar"}>
            <li>
              <a href={(loggedPatient ? "/patient-dashboard" : (loggedDoctor ? "/doctor-dashboard" : "/home"))} >Home</a>
            </li>
            <li>
              <a href="contact-us" className={blog?'active':""} onClick={()=>setBlog(true)}> Contact Us</a>
            </li>
            <li>
              <a href="/about-us"> Blog</a>
            </li>
            {(loggedPatient || loggedDoctor) &&
              <li>
                <a href="" onClick={handleLogout}> Logout</a>
              </li>
            }
          </ul>
        </div>
        <div id="mobile">
          <i className={clicked ? 'fas fa-times' : "fas fa-bars"} onClick={handleClick}></i>
        </div>
      </nav>
    </div>
  )
}
export default Header;
