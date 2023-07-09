import React, { useState } from "react";
import "../Styles/navbar.css";
import { HiPlusCircle, HiMenuAlt1 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { ThreeDots } from "react-loader-spinner";

const Navbar = () => {
	const location = useLocation();
	const relativePath = `/user/${Cookies.get("id")}`;
	const api = axios.create({
		baseURL: "https://shayrana-backend.onrender.com/",
	});

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const sideStyle = sidebarOpen ? { display: "flex" } : { display: "none" };
	const [isLoading, setIsLoading] = useState(false);
	const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

	const handleLogout = async () => {
		try {
			setIsLoading(true);
			await api.get("/users/logout", {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			Cookies.remove("login");
			Cookies.remove("id");
			window.location.href = "/";
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="navbar">
				<div className="nav_items">
					<Link to="/">
						<div className="logo-container">
							<img src="/logo192.png" alt="logo" className="logo" />
							{isLoading ? (
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
								<p className="title">Shayrana</p>
							)}
						</div>
					</Link>
					{Cookies.get("login") && location.pathname !== "/newBlog" && (
						<Link to="/newBlog">
							<div className="add_btn primary_btn">
								<HiPlusCircle size={22} />
								BLOG
							</div>
						</Link>
					)}
				</div>
				<div className="nav_right">
					<div className="nav_items">
						{!Cookies.get("login") && location.pathname === "/signup" && (
							<Link to="/login" className="nav_buttons">
								<div className="signup_btn primary_btn">Login</div>
							</Link>
						)}
						{!Cookies.get("login") && location.pathname !== "/signup" && (
							<Link to="/signup" className="nav_buttons">
								<div className="signup_btn primary_btn">Signup</div>
							</Link>
						)}
						{Cookies.get("login") && (
							<div className="acc nav_buttons">
								<Link to={relativePath}>
									<div className="signup_btn secondary_btn">
										<FaUserCircle size={22} />
										Me
									</div>
								</Link>
								<div className="dropdown">
									{/* <div className="dropdown-btn">Account</div>
              <hr /> */}
									<div onClick={handleLogout} className="dropdown-btn">
										<IoLogOutOutline size={22} />
										LOGOUT
									</div>
								</div>
							</div>
						)}
					</div>
					<div
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="nav_items ham"
					>
						{sidebarOpen ? (
							<MdOutlineCancel size={22} />
						) : (
							<HiMenuAlt1 size={22} />
						)}
					</div>
				</div>
			</div>
			{isMobile && (
				<div className="sidebar" style={sideStyle}>
					{!Cookies.get("login") && (
						<div className="sidebar_item">
							<Link to="/login">Login</Link>
						</div>
					)}
					{!Cookies.get("login") && (
						<div className="sidebar_item">
							<Link to="/signup">Signup</Link>
						</div>
					)}
					{Cookies.get("login") && (
						<Link to={relativePath}>
							<div className="sidebar_item">
								<FaUserCircle size={22} />
								Me
							</div>
						</Link>
					)}
					{Cookies.get("login") && (
						<div onClick={handleLogout} className="sidebar_item">
							<IoLogOutOutline size={22} />
							LOGOUT
						</div>
					)}
				</div>
			)}
		</>
	);
};
export default Navbar;
