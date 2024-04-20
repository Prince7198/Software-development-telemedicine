import React from 'react'
import "./Footer.css"
//import icons
import facebook from "/src/assets/facebook.png";
import instagram from "/src/assets/instagram.png";


const Footer = () => {
  return (
    <div className="footer" >
      <div className="sb_footer section_padding" >
        <div className="sb_footer-links">
        <div className="sb_footer-links-div">
          <h4>Quick Links</h4>
          <a href="/home" >
            <p>Home</p>
          </a>
          <a href="/aboutus" >
            <p>About Us</p>
          </a>
          <a href="/faqs" >
            <p>FAQS</p>
          </a>
        </div>
        {/* Repeating the structure above */}
        <div className="sb_footer-links-div">
          <h4>Resources</h4>
          <a href="/resource" >
            <p>Resource Centre</p>
          </a>
          <a href="/testmonials" >
            <p>Testimonials</p>
          </a>
          <a href="/insurance" >
            <p>Insurance</p>
          </a>
        </div>
        {/* Another column */}
        <div className="sb_footer-links-div">
          <h4>Temedicine</h4>
          <a href="/team" >
            <p>Our Team</p>
          </a>
          <a href="/blog" >
            <p>Blogs</p>
          </a>
          <a href="/contact" >
            <p>Contact</p>
          </a>
        </div>
        <div className="sb_footer-links-div">
          <h4>Careers</h4>
          <a href="/career" >
            <p>Careers</p>
          </a>
          <a href="/workshop" >
            <p>Workshops</p>
          </a>

        </div>
        <div className="sb_footer-links-div">
          <h4>Social Media Links</h4>
          <div className="socialmedia">
            <p><img src={facebook} alt="fb" /></p>
            <p><img src={instagram} alt="instagram" /></p>
          </div>
        </div>
      </div>
      </div>
      <hr />
      <div className="sb_footer-below">
        <div className="sb_footer-copyrights">
          <p>
            @{new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
        <div className="sb_footer-below-links">
          <a href="/terms"><div><p>Terms & Conditions</p></div></a>
          <a href="/privacy"><div><p>Privacy Statement</p></div></a>
        </div>

      </div>
    </div>
  )
}

export default Footer