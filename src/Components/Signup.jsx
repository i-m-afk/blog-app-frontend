import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  const validatePassword = (value) => {
    const { password } = getValues();
    return value === password || "Passwords do not match";
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
              {...register("first_name", { required: true })}
              type="text"
              id="first_name"
              name="first_name"
            />
          </div>
          <div className="input_grp">
            <label htmlFor="last_name">Last Name:</label>
            <input
              {...register("last_name", { required: true })}
              type="text"
              id="last_name"
              name="last_name"
            />
          </div>
          <div className="input_grp">
            <label htmlFor="email">Email:</label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="input_grp">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" required />
          </div>
          <div className="input_grp">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password", { required: true })}
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
                required: true,
                validate: validatePassword,
              })}
              type="password"
              id="confirm_password"
              name="confirm_password"
              autoComplete="on"
            />
          </div>
          <div className="errors">
            {errors.confirm_password && (
              <p>{errors.confirm_password.message}</p>
            )}
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
