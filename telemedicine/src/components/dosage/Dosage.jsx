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

    const [pname, setPname]= useState('');
    const [age, setAge] = useState('');
    const [usage, setUsage] = useState('');
    const [bill, setBill] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [dose, setDose]=useState();
    const [medicaid, setMedicaid] = useState('');
    const [email, setEmail] = useState('');
    const [doctorName, setDoctorName] = useState('');

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
    
    // get the doctor details 
    //let get the data from the database
    axios.get(`http://localhost:8081/get-doctor?staffNumber=${staffNumber}`, {
    })
    .then(response => {
      const doctor=response.data;
      setDoctorName(doctor.doctor_name);
    });

      // Get all appointment data
    axios.get(`http://localhost:8081/sick-patients?staffNumber=${staffNumber}`)
    .then(response => {
        const _patients=response.data;
        setPatients(_patients);
    });
    
},[navigate, staffNumber]);

const handleProcess=()=>{
    
   //make sure patient is selected
   if(patient.length <2){
    alert("Please choose a Patient");
    return;
   }
   document.getElementById('dogridView').style.display="grid";
//    get patient details 
axios.get(`http://localhost:8081/get-patient?patientUsername=${patient}`, {
})
.then(response => {
    //populate
  const patientData=response.data;
  setAge(patientData.patient_age);
  setPname(patientData.patient_name);
  setEmail(patientData.patient_email);
 
})

};

//on submit
const handleClick =(e) =>{
    e.preventDefault();
    const dat=new Date();
    

    //insert to the treated database. 
    axios.post('http://localhost:8081/treatment', {
      staffNumber: staffNumber,
      doctorName: doctorName,
      patientUsername: patient,
      patientName: pname,
      patientAge: age,
      patientEmail: email,
      dat:dat,
      symptoms: symptoms,
      diagnosis: diagnosis,
      dose:dose,
      usage:usage,
      bill: bill,
      medicaid:medicaid
      
    })
    .then(res => {
      
      alert("Information Recorded Successfully");
      setPatient('');
      setAge('');
      setBill('');
      setDiagnosis('');
      setPname('');
      setSymptoms('')
      setDose('');
      setEmail('');

      document.getElementById('dogridView').style.display="none";
    });

    

}
  return (
    <div className='dosbody'>
        <h1 className="dostitle"> Dosage & Prescription</h1>

        <div className="dosearch">
            <p>Select Patient: </p> &nbsp; &nbsp; 
            <select type='select'  placeholder="Choose Patient" value={patient} onChange={(e)=> setPatient(e.target.value)}>
                <option value=""></option>
                           
                            {patients.map(patient => (
                                <option key={patient.patientUsername} value={patient.patientUsername}>{patient.patientName}</option>
                            ))}
                        </select>  &nbsp; &nbsp; 
                        <button className='process' onClick={handleProcess}>Search</button>
                        <br />
        </div>

        <form className="prform" onSubmit={handleClick}>
        <div className="dogridView" id='dogridView' style={{display:"none"}}>
          <div>
          <label htmlFor="input-button">Patient Name</label><br /> <br />
          <input type="text" placeholder='name' value={pname} onChange={(e)=>{setPname(e.target.value);}} id='patientname' readOnly/><br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Patient Email</label><br /> <br />
          <input type="text" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value);}} readOnly /><br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Patient Age</label><br /> <br />
          <input type="text" placeholder='age' value={age} onChange={(e)=>{setAge(e.target.value)}}  readOnly /> <br /><br />
          </div>
         
          <div>
          <label htmlFor="input-button">Symptoms</label><br /> <br />
          <textarea required name="symptoms" id="" style={{fontSize:'20px', borderRadius:'10px' ,padding:'10px'}} cols="20" placeholder='Type here ...' value={symptoms} onChange={(e)=>setSymptoms(e.target.value)} rows="10"></textarea>
         </div>
          <div>
          <label htmlFor="input-button">Diagnosis</label><br /> <br />
          <textarea required  name="text" id="" style={{fontSize:'20px', borderRadius:'10px' ,padding:'10px'}} cols="20"  placeholder='Type here ...' value={diagnosis} onChange={(e)=>setDiagnosis(e.target.value)} rows="10"></textarea>
          </div>
         
          <div>
          <label htmlFor="input-button">Dose</label><br /> <br />
          <input type="text" placeholder='Dose name' value={dose} onChange={(e)=>{setDose(e.target.value)}} required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Usage per Day</label><br /> <br />
          <select name="select" id="" value={usage} onChange={(e)=>setUsage(e.target.value)}> 
          <option value="1">Once</option>
          <option value="2">Twice</option>
          <option value="3">Thrice</option>
          </select>   </div>
          <div>
          <label htmlFor="input-button">Bill in USD</label><br /> <br />
          <input type="number" placeholder='medical bill' value={bill} onChange={(e)=>{setBill(e.target.value)}} required /> <br /><br />
          </div>
          <div>
          <label htmlFor="input-button">Medicaid Supported</label><br /> <br />
         <select required name="select" id="" value={medicaid} onChange={(e)=>setMedicaid(e.target.value)}>
            <option value=""></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
         </select>
           </div>
           <br /> <br /><br />
        <div className="prbtnContainer">
        <button className='prbtnSubmit' type="submit" >Process</button>
        </div>
        </div>
        
        
       </form> 
        
    </div>
  )
}

export default Dosage