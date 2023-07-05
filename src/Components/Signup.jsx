import React from 'react';
import '../Styles/signup.css';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  }

  const validatePassword = (value) => {
    const { password } = getValues();
    return value === password || "Passwords do not match";
  }

  return (
    <div>
      <div className="login">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first_name">First Name:</label>
          <input {...register("first_name", { required: true })} type="text" id="first_name" name="first_name" /><br /><br />
          <label htmlFor="last_name">Last Name:</label>
          <input {...register("last_name", { required: true })} type="text" id="last_name" name="last_name" /><br /><br />
          <label htmlFor="email">Email:</label>
          <input {...register("email", { required: true })} type="email" id="email" name="email" required /><br /><br />
          <label htmlFor="gender">Gender:</label>
          <select {...register("gender", { required: true })} id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select><br /><br />
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" required /><br /><br />
          <label htmlFor="password">Password:</label>
          <input {...register("password", { required: true })} type="password" id="password" name="password" autoComplete='on' /><br /><br />
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input {...register("confirm_password", { required: true, validate: validatePassword })} type="password" id="confirm_password" name="confirm_password" autoComplete='on' /><br />
          {errors.confirm_password && <p>{errors.confirm_password.message}</p>}<br />
          <button type="submit" id='btn-signup'>SignUp</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
