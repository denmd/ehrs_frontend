import React from 'react';
import './Signin.css';

const Signin = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="signin-heading">Sign in</h1>
        <div className='form-content'>
          <form action="" method="post">
            <label htmlFor="username" className="label-signin-username">Username:</label>
            <input type="text" id="username" name="username" className="input-signin-username" placeholder="Enter your username" required />
            <label htmlFor="password" className="label-signin-password">Password:</label>
            <input type="password" id="password" name="password" className="input-signin-password" placeholder="Enter your password" required />
            <div className='btn_container_login'>
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
