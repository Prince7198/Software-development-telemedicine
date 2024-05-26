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
import GooglePatient from './Pages/GooglePatient';
import DHistory from './Pages/DHistory';
import SymptomsChecker from './Pages/SymptomsChecker';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import DocSchedules from './Pages/DocSchedules';

//chatbot
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import { GoogleLogin } from '@react-oauth/google';


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
      <Route path='/dhistory' element={<DHistory />} />
      <Route path='/symptoms-checker' element={<SymptomsChecker />} />
      <Route path='/update-details' element={<GooglePatient />} />
      <Route path='/about-us' element={<AboutUs/>} />
      <Route path='/contact-us' element={<ContactUs/>} />
      <Route path='/doc-schedules' element={<DocSchedules/>} />
     
      
    </Routes>
    </BrowserRouter>
 

    </>
    
  );
}
