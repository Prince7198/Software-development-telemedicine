import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Patient from '../components/appointments/Patient/Book/Patient';

const BookAppointment = () => {
  return (
    <div>
        <Header />
        <Patient />
        <Footer />
    </div>
  )
}

export default BookAppointment