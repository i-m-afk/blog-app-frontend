import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Signup = () => {
  if (Cookies.get("login")) {
    window.location.href = "/";
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const api = axios.create({
    baseURL: "https://shayrana-backend.onrender.com/",
  });

  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      // const response = await api.get("/blogs");
      const response = await api.post("/users/signup", {
        email: data.email,
        fname: data.first_name,
        lname: data.last_name,
        dob: data.dob,
        password: data.password,
        confirm: data.confirm_password,
      });
      setServerError(response?.data?.message);
      if (response?.data.success === true) {
        // setCookie("login", "true", 15);
        // setCookie("id", response?.data?._id, 15);
        window.location.href = "/login";
      }
    } catch (error) {
      setServerError(error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login form-wrapper">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_grp">
            <label htmlFor="first_name">First Name:</label>
            <input
              {...register("first_name", {
                required: {
                  value: true,
                  message: "First name is required",
                },
              })}
              type="text"
              id="first_name"
            />
          </div>
          <div className="input_grp">
            <label htmlFor="last_name">Last Name:</label>
            <input
              {...register("last_name", {
                required: {
                  value: true,
                  message: "Last name is required",
                },
              })}
              type="text"
              id="last_name"
              name="last_name"
            />
          </div>
          <div className="input_grp">
            <label htmlFor="email">Email:</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="input_grp">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              {...register("dob")}
              type="date"
              id="dob"
              name="dob"
              required
            />
          </div>
          <div className="input_grp">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              type="password"
              id="password"
              name="password"
              autoComplete="on"
            />
          </div>
          <div className="input_grp">
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input
              {...register("confirm_password", {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
                validate: (value) => {
                  if (value === watch("password")) {
                    return true;
                  } else {
                    return "Passwords do not match";
                  }
                },
              })}
              type="password"
              id="confirm_password"
              name="confirm_password"
              autoComplete="on"
            />
          </div>
          <div className="errors">
            {errors.confirm_password?.message ||
              errors.password?.message ||
              errors.email?.message ||
              errors.last_name?.message ||
              errors.first_name?.message ||
              errors.dob?.message ||
              serverError}
          </div>

          <button type="submit" className="primary_btn">
            Signup
          </button>
          <Link to="/login">
            <div className="secondary_btn">Login</div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
