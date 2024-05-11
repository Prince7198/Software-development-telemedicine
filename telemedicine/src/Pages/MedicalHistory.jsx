import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MedicalHist from '../components/MedicalHistory/Patient/MedicalHist';

const MedicalHistory = () => {
  return (
    <div>
        <Header />
        <MedicalHist />
        <Footer />

    </div>
  )
}

export default MedicalHistory