import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MyAppointments from '../components/appointments/Patient/List/MyAppointments';

const PatientAppointments = () => {
  return (
    <div>
        <Header />
        <MyAppointments />
        <Footer />
    </div>
  )
}

export default PatientAppointments