import React, {useState,useEffect} from 'react';
import logo from "/src/assets/logo.png";
import "./Header.css"

const Header =()=>{
  const [clicked, setClicked] =useState(false);
  const handleClick=()=>{
    setClicked(!clicked);

  }
  return (
    <div className='header'>
      <nav >
        <a href="/home">
          <img src={logo} alt="logo" width={100} height={100}/>
        </a>
        <div >
          <ul id='navbar' className={clicked? "#navbar active" : "#navbar"}>
            <li>
              <a href="/home" className='active'> Home</a>
            </li>
            <li>
              <a href="/contact Us"> Contact Us</a>
            </li>
            <li>
              <a href="/blog"> Blog</a>
            </li>
          </ul>
          
        </div>
        <div id="mobile">
          <i className={clicked?'fas fa-times':"fas fa-bars"} onClick={handleClick}></i>
        </div>
       
      </nav>        
    </div>
  )
}
export default Header