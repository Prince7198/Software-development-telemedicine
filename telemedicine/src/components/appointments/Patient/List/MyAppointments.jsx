import React, { useEffect, useState } from 'react';
import './MyAppointments.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Style } from '@mui/icons-material';

const MyAppointments = () => {
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

        // Get all appointment data
        axios.get(`http://localhost:8081/all-appointments`)
            .then(response => {
                // Map over the appointment data and add the id property
                const appointmentsWithId = response.data.map((appointment) => ({
                    ...appointment,
                    id: appointment.appointment_id // using unique identifier 'appointment_id' from the appointment data.
                }));
                setAppointments(appointmentsWithId);
            })
            .catch(error => {
                console.log(error);
            });
    }, [navigate, username]);


    const columns = [
        { field: 'appointment_id', headerName: 'ID', width: 70 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 200 },
        { field: 'patientAge', headerName: 'Age', width: 100 },
        { field: 'appointmentDate', headerName: 'Date', width: 150 },
        { field: 'appointmentTime', headerName: 'Time', width: 150 },
        { field: 'appointmentReason', headerName: 'Reason', width: 200 },
        {field: 'status', headerName: 'Status', width:200, }
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

    const handleApprove = (appointmentId) => {
        // Handle approve action for the appointment
        console.log("Approved appointment with ID:", appointmentId);
    };

    const handleReject = (appointmentId) => {
        // Handle reject action for the appointment
        console.log("Rejected appointment with ID:", appointmentId);
    };

    return (
        <div className='myabody'>
            <h1 className='myaheader'>My Appointments</h1>
            <DataGrid
                rows={appointments}
                columns={columns}
                pageSize={5}
            />
        </div>
    )
}

export default MyAppointments;
