import React,  {useState,  useEffect} from 'react';
import axios from 'axios';
import "./MedicalHist.css";
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

//customize the alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 


const MedicalHist = () => {
    const [username, setUsername] = useState("");
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const [rate, setRate] = useState (false);
    const [index, setIndex] = useState("");
    const [review, setReview] = useState("");
    const [ rating, setRating] =useState("");
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
                const appointmentsWithId = response.data.map((appointment) => ({
                    ...appointment,
                    id: appointment.id// using unique identifier 'appointment_id' from the appointment data.
                 
                }));
                setAppointments(appointmentsWithId);
            })
            .catch(error => {
                console.log(error);
            });
    }, [navigate, username]);


    const columns = [
    
        { field: 'dat', headerName: 'Date', width: 200 },
        { field: 'doctorName', headerName: 'Doctor Name', width: 200 },
        { field: 'symptoms', headerName: 'Symptoms', width: 250 },
        { field: 'diagnosis', headerName: 'Diagnosis', width: 200 },
        { field: 'dose', headerName: 'Dosage', width: 250 },
        { field: 'ussage', headerName: 'Usage per Day', width: 250 },
        {
            field: 'actions',
            headerName: 'Action',
            width: 250,
            renderCell: (params) => (
              <div className="button-container">
                {params.row.rating == null ? (
                <button className="action-button approve" onClick={() => handleRating(params.row.id)}> Rate &#9733; </button>
            ):(
                <button className="action-button approved" > Rated&#9733; </button>

            )}
            
          </div>
            )
        }
    ];

    const handleRating = (appointmentId) => {
      // Modify the status 
      setIndex(appointmentId);

      setRate(true);        
    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(review.length<1){
            setMsg1("Please Provide a Review.");
            setErr1("info");
            setOpen(true);
            return;
        }
        if(rating<1 || rating >5){
            setMsg1("Please Provide a valid Rating. Rating can only be between 1 (poor) and 5 (best)");
            setErr1("error");
            setOpen(true);
            return;
        }
        //else valid
        // get the details 
        axios.post(`http://localhost:8081/rating`, {
            id:index,
            review:review,
            rating:rating,
        })
        .then(results=>{
            //successfully inserted
            setRating("");
            setReview("");
            setRate(false); //collapse initial
            location.reload(); //reload page
            setSuccess(true) //open the other one for success
            
        }).catch(error=>{
            setMsg1("Something went wrong trying to rate and review the service. Try again Later");
            setErr1("error");
            setOpen(true);//show error
        })
        
        
    }

    const handleX=()=>{
        setRating("");
        setReview("");
        setRate(false);

    }


  return (
    <div className='mhbody'>
        <h1 className="mhhead">Medical History</h1>

        {
                rate &&(
                    <div className="success-popup">
                        <div className="success-content">
                            <div className="x" onClick={handleX}>X</div>
                            
                        <h2 className='headReview'>Review & Rating</h2>
                        {customAlert(msg1, err1)}
                        
                            <div className="content">
                            
                           <div className="review">
                            
                            <label htmlFor="">Review:</label> &nbsp;
                            <textarea name="textarea" placeholder='Type here...' required id="text-area" cols="30" rows="10" value={review}
                            onChange={(e)=>setReview(e.target.value)}></textarea>
                            </div>
                            <br />
                            <div className="review">
                            <label htmlFor="">Rate:</label> &nbsp;
                            <input type="number"  value={rating} required onChange={(e)=>setRating(e.target.value)} placeholder='1,2,3,4 or 5' />
                               </div>
                             
                           </div>
                            <button className='rButton' type='submit' onClick={handleSubmit}> Submit</button>
                           
                        </div>
                    </div>
                )}
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