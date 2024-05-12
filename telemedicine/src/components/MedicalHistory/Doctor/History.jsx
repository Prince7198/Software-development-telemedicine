import React,  {useState,  useEffect} from 'react';
import axios from 'axios';
import "./History.css";
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const History = () => {
    const [username, setUsername] = useState("");
    const [mhistory, setMHistory] = useState([]);
    const [patients, setPatients] =useState([]);
    const [patient, setPatient] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Get logged in doctor
        const loggedDoctor = localStorage.getItem("doctor");
        if (loggedDoctor) {
            setUsername(loggedDoctor);
        } else {
            navigate("/home");
        }


      // Get all patient 
    axios.get(`http://localhost:8081/all-patients`)
    .then(response => {
        const _patients=response.data;
        setPatients(_patients);
    });

        
    }, [navigate, username]);

    const handleProcess=()=>{
    
        //make sure patient is selected
        if(patient.length <2){
         alert("Please choose a Patient");
         return;
        }
        document.getElementById('dogridView').style.display="grid";
     //    get patient details 
     axios.get(`http://localhost:8081/patient-history?patientUsername=${patient}`, {
     })
     .then(response => {
        //populate the datagrid
        const historyWithId = response.data.map((history, index) => ({
            ...history,
            id: index+1 // using unique identifier 'appointment_id' from the appointment data.
        }));
        setMHistory(historyWithId);

     });
    }

    const columns = [
        { field: 'id', headerName: 'S/No', width: 70 },
        { field: 'dat', headerName: 'Date', width: 200 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 200 },
        { field: 'symptoms', headerName: 'Symptoms', width: 250 },
        { field: 'diagnosis', headerName: 'Diagnosis', width: 200 },
        { field: 'dose', headerName: 'Dosage', width: 250 },
        { field: 'ussage', headerName: 'Usage per Day', width: 250 }
    ]
    

  return (
    <div className='mhbody'>
        <h1 className="mhhead">Medical History</h1>

        <div className="dosearch">
            <p>Select Patient: </p> &nbsp; &nbsp; 
            <select type='select'  placeholder="Choose Patient" value={patient} onChange={(e)=> setPatient(e.target.value)}>
                <option value=""></option>
                           
                            {patients.map(patient => (
                                <option key={patient.patientUsername} value={patient.patientUsername}>{patient.patient_name}</option>
                            ))}
                        </select>  &nbsp; &nbsp; 
                        <button className='process' onClick={handleProcess}>Search</button>
                        <br />
        </div>

        <div className="mhdatagrid" id="dogridView" style={{display:"none"}}>
           <DataGrid className='mhdgrid' 
                rows={mhistory}
                columns={columns}
                pageSize={5}
            />
            </div> <br />
            

    </div>
  )
}

export default History