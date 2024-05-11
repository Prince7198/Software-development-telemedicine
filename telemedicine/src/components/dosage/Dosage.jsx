import React , {useState, useEffect} from 'react';
import "./Dosage.css";

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';

const Dosage = () => {
    const navigate=useNavigate();

    const [staffNumber, setStaffNumber] =useState('');
    const [patient, setPatient] =useState('');
    const [patients, setPatients] = useState([]);

    useEffect(()=>{

    
    //get the doctor
    const loggedDoctor= localStorage.getItem('doctor');
    if(loggedDoctor){
        setStaffNumber(loggedDoctor);
    }
    else{
        //logged out
        navigate('/home');

    }

      // Get all appointment data
    axios.get(`http://localhost:8081/sick-patients?staffNumber=${staffNumber}`)
    .then(response => {
        const _patients=response.data;
        setPatients(_patients);
    });
    
},[navigate, staffNumber]);
const handleChange =(e) =>{
    setPatient(e.arget.value);
}
  return (
    <div className='dosbody'>
        <h1 className="dostitle"> Dosage & Prescription</h1>

        <div className="search">
            <p>Search for Patient: </p> <select type='select' placeholder="Choose Patient" value={patient} onChange={(e)=> setPatient(e)}>
                           <option value=""></option>
                            {patients.map(patient => (
                                <option key={patient.patientUsername} value={patient.patientUsername}>{patient.patientName}</option>
                            ))}
                        </select> <br /><br />
        </div>
    </div>
  )
}

export default Dosage