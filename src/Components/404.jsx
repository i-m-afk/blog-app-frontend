import React from "react";
import "../Styles/notfound.css";
import Navbar from "./Navbar";

const Page404 = () => {
  return (
    <>
      <Navbar />
      <div className="page404">
        <img src="/notfound.svg" alt="Page not found" />

        <h1 className="heading">Oops! Page not found</h1>
        <p className="subtext">The page you are looking for does not exist.</p>
      </div>
    </>
  );
};

export default Page404;
