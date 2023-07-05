import "../Styles/styles.css";
import "../Styles/login.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="login form-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input_grp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="input_grp">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="primary_btn">
            Login
          </button>
          <Link to="/signup">
            <div className="secondary_btn">Signup</div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
