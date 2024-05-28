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
                const appointmentsWithId = response.data.map((appointment,index) => ({
                    ...appointment,
                    id: index + 1 
                }));
                setAppointments(appointmentsWithId);
            })
            .catch(error => {
                console.log(error);
            });
    }, [navigate, username]);


    const columns = [
        { field: 'id', headerName: 'S/No', width: 70 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 200 },
        { field: 'patientAge', headerName: 'Age', width: 100 },
        { field: 'appointmentDate', headerName: 'Date', width: 450 },
        { field: 'startTime', headerName: 'Start Time', width: 200 },
        { field: 'endTime', headerName: 'End Time', width: 200 },
        {field: 'status', headerName: 'Status', width:150, }
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
        <div className='myabody'>
            <h1 className='myaheader'>My Appointments</h1>
           <div className="datagrid">
           <DataGrid className='dgrid'
                rows={appointments}
                columns={columns}
                initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
         
                  disableRowSelectionOnClick
            />
            </div> <br />
            <div className="newAppointment" style={{alignItems:"center"}}>
                <p>Book a New Appointment?</p> &nbsp; <Link className='toBook' to="/book-appointment">Click Here</Link>
            </div>
        </div>
    )
}

export default MyAppointments;
