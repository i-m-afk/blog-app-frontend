import React from "react";
import "../Styles/navbar.css";
import { HiPlusCircle } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="navbar">
      <div className="nav_items">
        <Link to="/">
          <p className="title">Shayrana</p>
        </Link>
        {Cookies.get("user") && (
          <Link to="/newBlog">
            <div className="add_btn primary_btn">
              <HiPlusCircle size={22} />
              NEW BLOG
            </div>
          </Link>
        )}
      </div>
      <div className="nav_items">
        {!Cookies.get("user") && location.pathname === "/signup" && (
          <Link to="/login">
            <div className="signup_btn primary_btn">Login</div>
          </Link>
        )}
        {!Cookies.get("user") && location.pathname !== "/signup" && (
          <Link to="/signup">
            <div className="signup_btn primary_btn">Signup</div>
          </Link>
        )}
        {Cookies.get("user") && (
          <Link to="/">
            <div className="signup_btn primary_btn">
              <HiPlusCircle size={22} />
              NEW BLOG
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
