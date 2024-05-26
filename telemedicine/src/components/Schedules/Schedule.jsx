import React ,{useEffect, useState} from 'react';
import "./Schedule.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

//customize the alerts
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Schedule = () => {
    const [staffNumber, setStaffNumber] =useState();
    const navigate =useNavigate();
    const [open, setOpen] = useState(false);
    const [msg1, setMsg1] = useState("");
    const [err1, setErr1] = useState("");   
    const [success, setSuccess] =useState("");
    const [dat, setDat] =useState("");
    const [startTime, setStartTime] =useState("");
    const [endTime, setEndTime] = useState("");

    const [schedules, setSchedules] = useState([]);
    

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


    useEffect (()=>{
        const staff = localStorage.getItem("doctor");
        if(staff){
            setStaffNumber(staff);
        } else{
            navigate("/doctor-login");
        }
        //populate the Datagrid;
        axios.get(`http://localhost:8081/get-schedules?staffNumber=${staff}`)
        .then(response=>{
            //console.log(response.data);
            const schedulesWithID= response.data.map((_schedules)=>({
                ..._schedules,
                id:_schedules.id
            }));
            setSchedules(schedulesWithID);

        });

        


    },[navigate,staffNumber]);
    const columns=[
        { field: 'scheduleDate', headerName: 'Date', width: 200 },
        { field: 'startTime', headerName: 'Start Time', width: 200 },
        { field: 'endTime', headerName: 'End Time', width: 200 },
        { field: 'status', headerName: 'Status', width: 200,
            renderCell:(params)=>(
                <div style={{alignItems:"center", fontSize:"16px"}}>
                {params.row.availability==true?(
                <p style={{ justifyContent:"center", color:"green", padding:"5px"}}>Available</p>

                ) :(
                    <p style={{ justifyContent:"center", color:"red", padding:"5px"}}> Booked</p>
                )}
                </div>

            )
        },
        { field: 'action', headerName: 'Action', width: 200,
        renderCell:(params)=>(
            <div style={{alignItems:"center", fontSize:"16px"}}>
            {params.row.availability==true?(
            <button onClick={()=>handleDelete(params.row.id)} className='delBtn' style={{}}>Delete</button>

            ) :(
                <button disabled style={{ justifyContent:"center",disabled:"true" , background:"gray", padding:"5px", borderRadius:"5px", width:"100px", color: "white", fontWeight:"600", }}>N/A</button>
            )}
            </div>

        )
    },
        
        
    ]

    const handleDelete=(id)=>{
        
        axios.delete(`http://localhost:8081/del-schedule?id=${id}`)
        .then(response=>{
            //reload
            location.reload();
        })
        .catch(err=>{
            console.log( err);
        })
        
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(dat.length<1){
            setMsg1("Please select a Date");
            setErr1("warning");
            setOpen(true); 
            return;
        }
        else if(startTime.length < 1){
            setMsg1("Please select the Start Time");
            setErr1("warning");
            setOpen(true); 
            return;
        }
        else if(endTime.length < 1){
            setMsg1("Please select the End Time");
            setErr1("warning");
            setOpen(true); 
            return;
        }
        else if(startTime > endTime){
            setMsg1("Please select Valid Time Interval. ");
            setErr1("error");
            setOpen(true); 
            return;
        }
        else{
            setOpen(false);
            //Validated

            axios.post("http://localhost:8081/post-schedule", {
                staffNumber:staffNumber,
                scheduleDate:dat,
                startTime: startTime,
                endTime:endTime,
                availability: true
            })
            .then(response=>{
                //data inserted successfully
                
                setDat("");
                setStartTime("");
                setEndTime("");
                setMsg1("Schedule has been added successfully ");
                setErr1("success");
                setOpen(true); 

            })
            .catch(error=>{
                
                setDat("");
                setStartTime("");
                setEndTime("");
                setMsg1("Something went Wrong! Try again Later");
                setErr1("error");
                setOpen(true);
                console.log("ERRROR: " +error);
            })
        }


    }
    const handleNew =()=>{
        setSuccess(true);
        setOpen(false);
    }

    const handleCloseBtn =() =>{
        setSuccess(false);
        location.reload();
    }

  return (
    <div className='sbody'>
        <h1 className="stitle"> My Schedules</h1>
        
      {success  && <div className='success-popup' style={{padding:0}}>
            <div className="success-content" style={{alignItems:"center", textAlign:"center"}}>
                <div className="closeBtn" onClick={handleCloseBtn}>X</div>
                {/* error zone  */}
                {customAlert(msg1, err1)}
            <div className='sdate'>
                <label className='sldate' htmlFor="">Schedule Date: </label> &nbsp;
                <input className='sidate' value={dat} onChange={(e)=>setDat(e.target.value)} type="date" placeholder='Please enter the Date' required  />  
            </div>
            <form action="" className='sform'>
                <div className="gridView">            
                    <div className='inputBox'>
                        <label htmlFor="">Start Time: </label>&nbsp;
                        <input type="time" value={startTime} onChange={(e)=>setStartTime(e.target.value)} placeholder='Please enter the start Time' required />
                    </div>
                    <div className='inputBox'>
                        <label htmlFor="">End Time: </label> &nbsp;
                        <input type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} placeholder='Please enter the end Time' required />
                    </div>
                </div >
                <div  className='submit'>
                <input type="submit" value="Add Schedule" onClick={handleSubmit} />
                </div>
            </form>   
            </div>     
        </div>
}


    <>
    <button className='addNew' onClick={handleNew}>Add New</button>
    <br /><br /><br />
    <div className="mhdatagrid" style={{width:"58%"}}>
           <DataGrid className='mhdgrid'
                rows={schedules}
                columns={columns}
                pageSize={5}
            />
            </div> <br />
    </>
    </div>
  )
}

export default Schedule