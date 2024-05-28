import React , {useState, useEffect}from 'react';
import "./Doctor.css";

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

//customize the alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


const Doctor = () => {
  const [staffNumber, setStaffNumber] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg1, setMsg1] = useState("");
    const [meeting, setMeeting] = useState("")
    const [iid, setIid] =useState("");
    const [err1, setErr1] = useState("");   
    const [success, setSuccess] =useState("");
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
                    id: appointment.appointment_id // using unique identifier 'appointment_id' from the appointment data.
                }));
                setAppointments(appointmentsWithId);
            })
            .catch(error => {
                console.log(error);
            });
    }, [navigate, staffNumber]);


    const columns = [
        
        { field: 'patientName', headerName: 'Patient Name', width: 200 },
        { field: 'patientAge', headerName: 'Age', width: 100 },
        { field: 'appointmentDate', headerName: 'Date', width: 450 },
        { field: 'startTime', headerName: 'Start Time', width: 150 },
        { field: 'endTime', headerName: 'End Time', width: 200 },
        {field: 'status', headerName: 'Status', width:150, },
        {
            field: 'actions',
            headerName: 'Action',
            width: 250,
            renderCell: (params) => ( 
              <div className="button-container">
                {
                  params.row.status=='pending' ? (
                    <div>
              <button className="action-button approve" onClick={() => handleApprove(params.row.id)}>Approve</button> &nbsp;&nbsp;
              <button className="action-button reject" onClick={() => handleReject(params.row.id)}>Reject</button></div>
                  ):(
                    <div><button className='action-button'>N/A</button></div>
                  )
                }
              
          </div>
            )
        }
    ];


 //custom Alert config
 const customAlert = (message, severity) => {
  return (
      <Collapse in={open}>
          <Alert
              action={
                  <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                          setOpen(false);
                      }}
                  >
                      <CloseIcon fontSize="inherit" />
                  </IconButton>
              }
              severity={severity}
              sx={{ mb: 2 }}
          >
              {message}
          </Alert>
      </Collapse>
  );
};


    const handleApprove = (appointmentId) => {
      setIid(appointmentId);
      setSuccess(true);
    
    };

    const handleReject = (appointmentId) => {
      axios.post(`http://localhost:8081/reject?appointment_id=${appointmentId}`,{
        appointment_id:appointmentId,
        
      })
      .then(response=>{
        location.reload();
        // Handle approve action for the appointment
        console.log("Rejected appointment with ID:", appointmentId);

      })
    };
    const handleCloseBtn =() =>{
      setSuccess(false);
      location.reload();
  }
  const handleSubmit =(e) =>{
    e.preventDefault()

      // Modify the status 
      if(meeting.length < 1){
        setMsg1("Please enter a valid meeting link");
        setErr1("warning");
        setOpen(true);
        return;
      }

      axios.post(`http://localhost:8081/approve?appointment_id=${iid}`,{
        appointment_id:iid,
        meeting:meeting,
        
      })
      .then(response=>{
        location.reload();
        // Handle approve action for the appointment
        console.log("Approved appointment with ID:", appointmentId);

      })
        

  }


  return (
    <div className='dabody'>
      <h1 className='datitle'>Doctor Appointments</h1>
         
      {success  && <div className='success-popup' style={{padding:0}}>
            <div className="success-content" style={{alignItems:"center", textAlign:"center"}}>
                <div className="closeBtn" onClick={handleCloseBtn}>X</div>
                <h2 style={{color:"rgb(49,121,181)"}}>Google Meet</h2>
                {/* error zone  */}
                {customAlert(msg1, err1)}
            
            <form action="" className='sform'>
                           
                    <div className='inputBox'>
                        <label htmlFor="">Meeting Link: </label>&nbsp;
                        <input type="text" style={{padding:"5px", fontSize:"16px",borderRadius:"5px", border:"1px solid rgb(49,121,181)"}} value={meeting} onChange={(e)=>setMeeting(e.target.value)} placeholder='Please enter the google meet' required />
                    </div>
                                    
                <div  className='submit'>
                <input type="submit" value="Approve" onClick={handleSubmit} />
                </div>
            </form>   
            </div>     
        </div>
}
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
            
                disableRowSelectionOnClick
            />
            </div> 
            <div className="pappointments" >
              <Link to="/doc-schedules" className='link'>Manage Schedules&#8594; </Link>
            </div>
                <br />
       

    </div>
  )
}

export default Doctor