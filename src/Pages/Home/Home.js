import React from 'react';
import './Home.css';
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()

  const Createsignup=()=>{
    navigate('/choicepage2')
  }

  const Createsigin=()=>{
    navigate('/signin')
  }
  return (
    <>
     <div className='image-container'>
       <h1 className='home-heading1'>Making Health Care </h1><br/>
       <h1 className='home-heading2'>Better Together </h1>

      <div className="button-container">
        <button className="round-button" onClick={Createsignup} >Register</button>
        <button className="round-button" onClick={Createsigin}>Sign In</button>
      </div>
      </div>
    
    </>
  );
};

export default Home;
