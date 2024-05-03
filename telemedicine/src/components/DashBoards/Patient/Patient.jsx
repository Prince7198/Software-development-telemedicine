import React , {useState, useEffect} from 'react';
import "./Patient.css";
import { Link , useNavigate} from 'react-router-dom';

const Patient = () => {
  const navigate=useNavigate();
  // get logged in patient 
  useEffect(() =>{
    const loggedPatient = localStorage.getItem("patient");
    if(!loggedPatient){
      navigate("/");//back to login
    }
    

  }, [])
  

  return (
    <div className='pdbody'>
      <div className='pdbanner'>
        <h1 className='pdheader'>Patient Dashboard</h1>
      </div>
      <div className="pdcomponents">
        <div className="pdmedicalhistory">
          <div className="pdcontent">
            <Link to="/patient-history" className='pdcomplink'><u> Medical History </u> </Link><br /> <br />
            <p>
              This Page will list all the Medical History of the  Patient.
            </p>


          </div>

        </div>
        <div className="pdmedicalhistory">
          <div className="pdcontent">
            <Link to="/book-appointment" className='pdcomplink'><u> Patient Appointment </u> </Link><br /><br />
            <p>
              This Page will allow the  Patient access all information related to Appointments.
            </p>


          </div>

        </div>
        
        <div className="pdmedicalhistory">
          <div className="pdcontent">
            <Link to="/symptoms-checker" className='pdcomplink'><u> Symptoms Checker </u> </Link><br /> <br />
            <p>
              This Page will allow the patient to supply the symptoms and get preliminary Analysis.
            </p>


          </div>

        </div>
      </div>
   
    </div>
  )
}

export default Patient