import React from 'react';
import './choicepage2.css';
import {useNavigate} from "react-router-dom"


const Choicepage2 = () => {
  const navigate=useNavigate()

  const Signinforpatient=()=>{
    navigate('/register-patient')
  }
  const Signinformedicalprofessional=()=>{
    navigate('/register-medicalprofessional')
  }
return(
    <>
    
    <div className="main-container-choicepage2"> 
    <div className='heading-container'><h1 className="heading">Are you a</h1></div>
    <div className="button-container1">
    <button className="round-button1" id="bt1"onClick={Signinformedicalprofessional} >Medical Professional</button>
    <button className="round-button1" id="bt2" onClick={Signinforpatient}>Patient</button>
  </div>
  </div>
  </>
);
};

export default Choicepage2;
