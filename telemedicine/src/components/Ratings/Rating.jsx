import React, { useState, useEffect } from 'react';
import "./Ratings.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Rating = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        // Get logged in doctor
        const loggedDoctor = localStorage.getItem("doctor");
        if (loggedDoctor) {
            setUsername(loggedDoctor);
        } else {
            navigate("/home");
        }

        // Get all information on treatment  
        axios.get(`http://localhost:8081/doctor-rating?staffNumber=${username}`)
            .then(response => {
                const ratingsWithId = response.data.map((rating) => ({
                    ...rating,
                    id: rating.id // using unique identifier 
                }));
                setRatings(ratingsWithId);
            }).catch(error => {
                console.log("No data returned" + " " + error);
            });

    }, );

    return (
        <div className='rbody'>
            <h1 className="rtitle">Rating and Reviews</h1>
            <div className="ratings-container">
                {ratings.length != 0 ? ratings.map((rating) => rating.rating !=null && (
                    <div key={rating.id} className="rating-card">
                        <div className="rating-date"> <b>Date:</b> {rating.dat}</div>
                        <div className="rating-patient"><b>Patient Name: </b>Patient Name: {rating.patientName} (Age: {rating.patientAge})</div>
                        <div className="rating-diagnosis"><b>Diagnosis:</b> {rating.diagnosis}</div>
                        <div className="rating-dose"><b>Dose:</b> {rating.dose}</div>
                        <div className="rating-value"><b>Rating: </b>{rating.rating}</div>
                        <div className="rating-review"><b>Review:</b> {rating.review}</div>
                    </div>
                )
                ):(
                  <div>
                    <h4 style={{textAlign:"center", }}> <i> None of your services has been rated!!</i></h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Rating;
