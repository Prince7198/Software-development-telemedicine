import React , {useState, useEffect}from 'react';
import "./Doctor.css";

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Doctor = () => {
  const [staffNumber, setStaffNumber] = useState("");
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Get logged in doctor
        const loggedDoctor= localStorage.getItem("doctor");
        if (loggedDoctor) {
            setStaffNumber(loggedDoctor);
        } else {
            navigate("/home");
        }

        // Get all appointment data
        axios.get(`http://localhost:8081/doctor-appointments?staffNumber=${staffNumber}`)
            .then(response => {
                // Map over the appointment data and add the id property
                const appointmentsWithId = response.data.map((appointment, index) => ({
                    ...appointment,
                    id: index+1 // using unique identifier 'appointment_id' from the appointment data.
                }));
                setAppointments(appointmentsWithId);
            })
            .catch(error => {
                console.log(error);
            });
    }, [navigate, staffNumber]);


    const columns = [
        { field: 'id', headerName: 'S/No', width: 70 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 200 },
        { field: 'patientAge', headerName: 'Age', width: 100 },
        { field: 'appointmentDate', headerName: 'Date', width: 150 },
        { field: 'appointmentTime', headerName: 'Time', width: 150 },
        { field: 'appointmentReason', headerName: 'Reason', width: 200 },
        {field: 'status', headerName: 'Status', width:150, },
        {
            field: 'actions',
            headerName: 'Action',
            width: 250,
            renderCell: (params) => (
                <div>
                    <button onClick={() => handleApprove(params.row.id)}>Approve</button> &nbsp; &nbsp;
                    <button onClick={() => handleReject(params.row.id)}>Reject</button>
                </div>
            )
        }
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
    <div className='dabody'>
      <h1 className='datitle'>Doctor Appointments</h1>
      
      <div className="ddatagrid">
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
                checkboxSelection
                disableRowSelectionOnClick
            />
            </div> <br />

    </div>
  )
}

export default Doctor