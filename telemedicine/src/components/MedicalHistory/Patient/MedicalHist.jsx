import React,  {useState,  useEffect} from 'react';
import axios from 'axios';
import "./MedicalHist.css";
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const MedicalHist = () => {
    const [username, setUsername] = useState("");
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Get logged in patient
        const loggedPatient = localStorage.getItem("patient");
        if (loggedPatient) {
            setUsername(loggedPatient);
        } else {
            navigate("/home");
        }

        // Get all medical data of the patient
        axios.get(`http://localhost:8081/patient-history?patientUsername=${username}`)
            .then(response => {
                console.log(response.data);
                // Map over the medical history data and add the id property
                const appointmentsWithId = response.data.map((appointment, index) => ({
                    ...appointment,
                    id: index+1 // using unique identifier 'appointment_id' from the appointment data.
                }));
                setAppointments(appointmentsWithId);
            })
            .catch(error => {
                console.log(error);
            });
    }, [navigate, username]);


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
        <div className="mhdatagrid">
           <DataGrid className='mhdgrid'
                rows={appointments}
                columns={columns}
                pageSize={5}
            />
            </div> <br />
            

    </div>
  )
}

export default MedicalHist