import '../Styles/styles.css'
import React, { useState } from 'react';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <div className="login">
      <h2>FORM</h2>
      <form onSubmit={handleSubmit}>
        Email<input type="email" placeholder="email" id="input-email" name="email" onChange={handleInputChange} />
        Password<input type="password" placeholder="password" id="input-pass" name="password" onChange={handleInputChange} />
        <button type="submit" id="btn-login">Login</button>
        <button type="submit" id="btn-signup">Signup</button>
      </form>
    </div>
  );
};

export default Login;
