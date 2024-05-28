import React, { useState, useEffect } from 'react';
import "./Patient.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';


import { DataGrid } from '@mui/x-data-grid';

//customize the alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Patient = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [doctor, setDoctor] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [tim, setTim] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [dat, setDat] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [gender, setGender] = useState('');
    const [doctorName, setDoctorName] =useState('');
    const [open, setOpen] = useState(false);
    const [msg1, setMsg1] = useState("");
    const [err1, setErr1] = useState("");   
    const [success, setSuccess] =useState("");
    
  
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
  
  

    useEffect(() => {
        const loggedPatient = localStorage.getItem("patient");
        if (!loggedPatient) {
            navigate("/home");
        }
        setUsername(loggedPatient);

        axios.get(`http://localhost:8081/get-patient?patientUsername=${loggedPatient}`)
            .then(response => {
                const patient = response.data;
                setFullname(patient.patient_name);
                setAge(patient.patient_age);
                setEmail(patient.patient_email);
                setGender(patient.patient_gender);
                setUsername(patient.patientUsername);
            })
            .catch(error => {
                console.log("Error: " + error);
            });

        axios.get("http://localhost:8081/all-doctors")
            .then(response => {
                setDoctors(response.data);//Array of Doctors
                
            })
            .catch(error => {
                console.log("Error: " + error);
            });

       
    }, [navigate, username]);

    const handleClick = (e) => {
        e.preventDefault();
        
        
        
        // imput validations
        if(doctor.length < 3){
          setMsg1("please select a Doctor");
          setErr1('error');
          setOpen(true);
          return;
        }
        
         // get doctor name 
        //let get the data from the database
        axios.get(`http://localhost:8081/get-schedules?staffNumber=${doctor}`, {
        })
        .then(response => {
            const dschedules=response.data;
            console.log(dschedules);
            const scheduleswithIDs = dschedules.map((schedules)=>({
                ...schedules,
                id:schedules.id,
            }));
            setSchedules(scheduleswithIDs);


       
    })
    .catch(error=>{
        console.log("Error: "+ error);
        setSchedules([]);
    })
    }
    const columns =[
        {field: "scheduleDate", headerName:"Date", width:250},
        {field:"startTime", headerName:"Start Time", width:200},
        {field:"endTime", headerName:"End Time", width:200},
        {field:"status", headerName:"Status", width:200,
            renderCell:(params) =>(
                <div className="renderStatus">
                    {params.row.availability==1?
                    (
                        <p color='green' className="available">Available</p>
                    ):(
                        <p className="booked">Booked</p>
                    )}
                </div>
            )
        },
        {field:"action", headerName:"Action", width:300,
            renderCell:(params)=>(
                <div className="actions">
                    {params.row.availability==1 ?(
                        <button onClick={()=>handleBook(params.row.id)}  className='bNow'>Book Now</button>
                    ):(
                        <button style={{disabled:"true"}} className='na'>N/A</button>
                    )}
                </div>
            )
        },
    ];
    const handleBook =(id)=>{
        //get all data from the schedule
        axios.get(`http://localhost:8081/get-schedle?id=${id}`)
        .then(response=>{
            // console.log(response.data);
            const schedule=response.data[0];
            const staffNumber= schedule.staffNumber;
            const startTime= schedule.startTime;
            const endTime = schedule.endTime;
            const scheduleDate=schedule.scheduleDate;
            
    
          

            axios.get(`http://localhost:8081/get-doctor?staffNumber=${staffNumber}`)
            .then(response => {
                const _doctor=response.data;
                const staffName=_doctor.doctor_name;  
               
                
                //insert the record
        axios.post(`http://localhost:8081/patient/book-appointment`, {
            patientUsername:username,
            patientName: fullname,
            patientEmail: email,
            patientAge: age,
            patientGender: gender,
            doctorName: staffName,
            staffNumber:staffNumber,
            appointmentDate: scheduleDate,
            startTime:startTime,
            endTime: endTime,
  
          })
          .then(response=>{
          //successful application
          axios.post(`http://localhost:8081/update-schedule?id=${id}`);
           // console.log(response.data);           
            setMsg1("Appointment has been booked succcessfully.");
            setErr1("success");
            setOpen(true);
            
            })
            .catch(error => {
                console.log("Error: " + error);
                location.reload();
                setMsg1("An Error has occurred! Please try again later.");
                setErr1("error");
                setOpen(true);
            });
            });
 });
    }

    return (
        <div className='pabody' > 
            <h1 className='paheader'>Patient Appointment</h1>
            {
                customAlert(msg1,err1)
            }
            <form className="paform" onSubmit={handleClick}>
                <div className="schedule">
                    <div className="selDoctor">
                    <label htmlFor="input-button">Select a Doctor: </label> &nbsp;                        
                        <select type='select' placeholder="Select a Doctor" value={doctor} onChange={(e)=> setDoctor(e.target.value)}>
                            <option value=""></option>
                            {doctors.map(doctor => (
                                <option key={doctor.staffNumber} value={doctor.staffNumber}>{doctor.doctor_name}</option>
                            ))}
                        </select> &nbsp; &nbsp;
                    </div>
                    <input type='submit' className='view' value="View" />
                </div>
                        
            </form>
            <div className="ddatagrid" style={{width:"60%", float:"left"}}>
           <DataGrid className='dgrid' style={{minHeight:"450px"}}
                rows={schedules}
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
            <div className="pappointments" style={{marginTop:"20px", position:"relative"}}>
              <Link to="/patient-appointments" className='link'>My appointments&#8594; </Link>
            </div>
                <br />
           
        </div>
    )
}

export default Patient;
