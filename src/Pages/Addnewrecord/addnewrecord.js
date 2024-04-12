import React from 'react';

import './addnewrecord.css';

const Addnewrecord = () => {
  const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
 

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sessionToken = localStorage.getItem('sessionToken');
      if (!sessionToken || !userId) {
        console.error('Session token or user ID not found');
        return;
      }

      // Get form data
      const title = e.target.elements.title.value;
      const description = e.target.elements.description.value;
      const file = e.target.elements.document.files[0]; // Get the selected file

      // Create form data object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('document', file);

      // Make API request to backend
      const response = await fetch('http://localhost:8000/medical-record/upload', {
        method: 'POST',
        headers: {
          'Authorization': sessionToken, // Include session token in Authorization header
          'X-UserId': userId, // Include user ID in custom header
        },
        body: formData, // Pass form data object
      });

      // Check if request was successful
      if (response.ok) {
        console.log('Record added successfully');
        // Redirect user to another page
      // Redirect to home page or another appropriate route
      } else {
        console.error('Error adding record:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div className="addnewrecord-container">
     <div className="sidebar">
        <ul>
          <li>Profile</li>
          <li>Add Doctor</li>
          <li>Add Record</li>
        </ul>
      </div>
      <div className="main-content-newrecord">
        <h1>Add New Record</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" /><br />
          <input type="text" name="description" placeholder="Description" /> <br />
          <input type="file" id="document-upload" name="document" accept=".pdf,.doc,.docx" /> <br />
          <button type="submit" className='done-button'>Done</button>
        </form>
      </div>
    </div>
  );
};

export default Addnewrecord;