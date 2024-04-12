
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './Pages/Signin/Signin';
import Home from './Pages/Home/Home';
import Registerpatient from './Pages/Register-patient/Register-patient';
import Registermedicalprofessional from './Pages/Register-medicalprofessional/Register-medicalprofessional';
import Choice from './Pages/Choicepage/choice';
import Choicepage2 from './Pages/Choicepage2/choicepage2';
import Adddoctor from './Pages/Adddoctor/adddoctor';
import Addrecord from './Pages/Addrecord/addrecord';
import Addnewrecord from './Pages/Addnewrecord/addnewrecord';
import Sample from './Pages/Sample/Sample';
import PatientProfile from './Pages/PatientProfile/PatientProfile';
import DoctorProfile from './Pages/Doctorprofile/Doctorprofile';
import MypatientProfile from './Pages/Mypatient/Mypatient';
import FindMyPatient from './Pages/Findmypatient/FindMyPatient';


function App() {
  return (
    <div>
    <Router>
      <Routes>
      
      <Route  path="/"  element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/register-patient" element={<Registerpatient />} />
      <Route path="/register-medicalprofessional" element={<Registermedicalprofessional />} />
      <Route path="/choicepage1" element={<Choice />} />
      <Route path="/choicepage2" element={<Choicepage2 />} />
      <Route path="/adddoctor" element={<Adddoctor />} />
      <Route path="/addrecord" element={<Addrecord />} />
      <Route path="/addnewrecord" element={<Addnewrecord />} />
      <Route path="/patientprofile" element={<PatientProfile />} />
      <Route path="/doctorprofile" element={<DoctorProfile />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/mypatient" element={<MypatientProfile />} />
      <Route path="/findmypatient" element={<FindMyPatient />} />
      
      </Routes>
    </Router>
    </div>
  );
}

export default App;
