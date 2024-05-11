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
        { field: 'diagnosis', headerName: 'Illness/Diagnosis', width: 200 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 200 },
        { field: 'remarks', headerName: 'Doctor Remarks', width: 250 }
        // {
        //     field: 'actions',
        //     headerName: 'Action',
        //     width: 250,
        //     renderCell: (params) => (
        //         <div>
        //             <button onClick={() => handleApprove(params.row.id)}>Approve</button> &nbsp; &nbsp;
        //             <button onClick={() => handleReject(params.row.id)}>Reject</button>
        //         </div>
        //     )
        // }
    ];

    // const handleApprove = (appointmentId) => {
    //     // Handle approve action for the appointment
    //     console.log("Approved appointment with ID:", appointmentId);
    // };

    // const handleReject = (appointmentId) => {
    //     // Handle reject action for the appointment
    //     console.log("Rejected appointment with ID:", appointmentId);
    // };

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