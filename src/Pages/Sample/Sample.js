import React from 'react';
import './Sample.css';
import {useNavigate} from "react-router-dom";

const Sample = () => {
  const navigate=useNavigate()

  const Createsignup=()=>{
    navigate('/choicepage2')
  }

  const Createsigin=()=>{
    navigate('/signin')
  }
  return (
    <>
     <div>Register</div>
     <div>Sign in</div>
     <span>Medical Record is</span>
    <div className='imagecontainer'></div>
    </>
  );
};

export default Sample;
