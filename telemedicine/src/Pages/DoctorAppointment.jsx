import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Doctor from '../components/appointments/Doctor/Doctor';


const DoctorAppointment = () => {
  return (
    <div>
        <Header />
        <Doctor />
        <Footer />
    </div>
  )
}

export default DoctorAppointment