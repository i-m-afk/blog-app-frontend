import React from "react";
import "../Styles/navbar.css";
import { HiPlusCircle } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const api = axios.create({
    baseURL: "https://shayrana-backend.onrender.com/",
  });
  const handleLogout = async () => {
    try {
      await api.get("/users/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      Cookies.remove("login");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="nav_items">
        <Link to="/">
          <div className="logo-container">
            <img src='./logo192.png' alt='logo' className="logo" />
            <p className="title">Shayrana</p>
          </div>
        </Link>
        {Cookies.get("login") && location.pathname !== "/newBlog" && (
          <Link to="/newBlog">
            <div className="add_btn primary_btn">
              <HiPlusCircle size={22} />
              NEW BLOG
            </div>
          </Link>
        )}
      </div>
      <div className="nav_items">
        {!Cookies.get("login") && location.pathname === "/signup" && (
          <Link to="/login">
            <div className="signup_btn primary_btn">Login</div>
          </Link>
        )}
        {!Cookies.get("login") && location.pathname !== "/signup" && (
          <Link to="/signup">
            <div className="signup_btn primary_btn">Signup</div>
          </Link>
        )}
        {Cookies.get("login") && (
          <div onClick={handleLogout} className="signup_btn secondary_btn">
            <FaUserCircle size={22} />
            LOGOUT
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
