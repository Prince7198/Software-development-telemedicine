import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//get pages
import Home from './Pages/Home';
import DoctorRegister from './Pages/DoctorRegister';
import DoctorLogin from './Pages/DoctorLogin';

import PatientLogin from './Pages/PatientLogin';
import PatientRegister from './Pages/PatientRegister';
import PatientDashboard from './Pages/PatientDashboard';
import DoctorDashboard from './Pages/DoctorDashboard';
import BookAppointment from './Pages/BookAppointment';
import PatientAppointments from './Pages/PatientAppointments';
import MedicalHistory from './Pages/MedicalHistory';
import DosagePage from './Pages/DosagePage';
import DoctorAppointment from './Pages/DoctorAppointment';
import RatingPage from './Pages/RatingPage';




export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* basic route */}
      <Route index element={<Home/>}/>      
      <Route path='/home' element={<Home />}/>      
      <Route path='/doctor-register' element={<DoctorRegister />} />
      <Route path='/doctor-login' element={<DoctorLogin />} />
      <Route path='/patient-login' element={<PatientLogin />}/>
      <Route path='/patient-register' element={<PatientRegister />}/>
      <Route path='/patient-dashboard' element={<PatientDashboard />}/>
      <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
      <Route path='/book-appointment' element={<BookAppointment /> } />
      <Route path = '/patient-appointments' element={<PatientAppointments />} />
      <Route path='/patient-history' element={< MedicalHistory /> } />
      <Route path='/dosage' element={< DosagePage />}/>
      <Route path='/doctor-appointment' element={< DoctorAppointment />}/>
      <Route path='/doctor-rating' element={< RatingPage />}/>
      
    </Routes>
    </BrowserRouter>
 

    </>
    
  );
}
