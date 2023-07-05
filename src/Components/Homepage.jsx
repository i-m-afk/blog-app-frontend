import React from "react";
import "../Styles/homepage.css";
import Navbar from "./Navbar";
import Card from "./Card";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="categoryBar">
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
        <p>Nature</p>
      </div>
      <main className="home_main">
        <div className="filter">
          <select className="filter_options">
            <option value="views">Views</option>
            <option value="like">Likes</option>
            <option value="date">Time</option>
          </select>
        </div>
        <div className="blogs">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </>
  );
};

export default Homepage;
