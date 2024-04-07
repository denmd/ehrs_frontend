import React, { useState } from 'react';
import './adddoctor.css';

const Adddoctor = () => {
  const [searchValue, setSearchValue] = useState('');
  const [addedDoctors, setAddedDoctors] = useState([]);
  const [showBoxContainer, setShowBoxContainer] = useState(false);

  const handleAddDoctor = () => {
    setAddedDoctors(prevDoctors => [...prevDoctors, searchValue]);
    setSearchValue('');
    setShowBoxContainer(true); // Always show box container when content is added
  };

  return (
    <div className="adddoctor-container">
      <div className="sidebar">
        <ul>
          <li>Profile</li>
          <li>Add Doctor</li>
          <li>Add Record</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search Doctor..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleAddDoctor} className="add-button">Add</button>
        </div>

        

        <div className={`box-container ${showBoxContainer ? '' : 'hide'}`}>
          {addedDoctors.map((doctor, index) => (
            <div className="box" key={index}>
              <div className="box-content">{doctor}</div>
              <div className="button-box">
                <button className="access-button">Access</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adddoctor;
