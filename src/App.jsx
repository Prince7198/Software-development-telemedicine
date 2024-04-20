import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//get pages
import Home from './Pages/Home';
import DoctorRegister from './Pages/DoctorRegister';
import DoctorLogin from './Pages/DoctorLogin';

import PatientLogin from './Pages/PatientLogin';
import PatientRegister from './Pages/PatientRegister';


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
    </Routes>
    </BrowserRouter>
 

    </>
    
  );
}
