import React, { useState } from 'react';
import './Doctor.css';
import { Link } from 'react-router-dom';



const Doctor = () => {

  const [meeting, setMeeting]=useState("");
  
  //ensure the meeting link is provided
  return (
    <div className='ddbody'>
      <h1 className='ddtitle'>Doctor Dashboard</h1>

      <div className="dddosage">
          <div className="content"> 
          <img src="/src/assets/vidico.jpg" className='meetIcon' alt="" />
            <Link to={meeting} className='ddcomplink'><u> Meet </u> </Link><br /> <br />
          </div>

        </div>
        <br />
<div></div>
      <div className="ddcomponents">
      <div className="ddmedicalhistory">
          <div className="ddcontent">
            <Link to="/dosage" className='ddcomplink'><u> Dosage & Prescription </u> </Link><br /> <br />
            <p>
              This Page will allow the patient supply the symptoms and get preliminary analysis.
            </p>


          </div>

        </div>
        <div className="ddmedicalhistory">
          <div className="ddcontent">
            <Link to="/patient-history" className='ddcomplink'><u> Medical History </u> </Link><br /> <br />
            <p>
              This Page will list all the Medical History of diffferent Patients.
            </p>


          </div>

        </div>
        <div className="ddmedicalhistory">
          <div className="ddcontent">
            <Link to="/doctor-appointment" className='ddcomplink'><u> Appointments </u> </Link><br /><br />
            <p>
              This Page will list all the information about Appointments.
            </p>


          </div>

        </div>
        
        <div className="ddmedicalhistory">
          <div className="ddcontent">
            <Link to="/doctor-rating" className='ddcomplink'><u> Ratings & Reviews </u> </Link><br /> <br />
            <p>
              This Page will list all the feedbacks left by patients after service delivery.
            </p>


          </div>

        </div>
      </div>
   

    </div>
  )
}

export default Doctor