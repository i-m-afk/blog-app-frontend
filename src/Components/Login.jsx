import "../Styles/styles.css";
import "../Styles/login.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
const Login = () => {
	if (Cookies.get("login")) {
		window.location.href = "/";
	}
	const [serverError, setServerError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const api = axios.create({
		baseURL: "https://shayrana-backend.onrender.com/",
	});
	function setCookie(name, value, minutes) {
		const expires = new Date();
		expires.setTime(expires.getTime() + minutes * 60 * 1000); // Convert minutes to milliseconds
		document.cookie =
			name +
			"=" +
			encodeURIComponent(value) +
			";expires=" +
			expires.toUTCString() +
			";path=/";
	}

	const onSubmit = async (data) => {
		setServerError("");
		try {
			setIsSubmitting(true);
			const response = await api.post(
				"/users/login",
				{
					email: data.email,
					password: data.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			setServerError(response?.data?.message);
			if (response?.data.success === true) {
				setCookie("login", "true", 15);
				setCookie("id", response?.data?._id, 15);
				window.location.href = "/";
			}
			setIsSubmitting(false);
		} catch (error) {
			setServerError(error.response?.data?.message);
		}
	};

	return (
		<>
			<Navbar />
			<div className="login form-wrapper">
				<h2>Login</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="input_grp">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							placeholder="email"
							name="email"
							{...register("email", {
								required: {
									value: true,
									message: "Email is required",
								},
							})}
						/>
					</div>
					<div className="input_grp">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							placeholder="password"
							name="password"
							{...register("password", {
								required: {
									value: true,
									message: "Password is required",
								},
							})}
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
						{isSubmitting ? (
							<ThreeDots
								height="30"
								width="60"
								radius="9"
								color="#fff"
								ariaLabel="three-dots-loading"
								wrapperStyle={{}}
								wrapperClassName=""
								visible={true}
							/>
						) : (
							"Login"
						)}
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
