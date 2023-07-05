import React from "react";
import { HiEye } from "react-icons/hi";
const Card = () => {
  return (
    <div className="card">
      <div className="top">
        <div className="views">
          <HiEye />
          123
        </div>
      </div>
      <div className="card-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, harum.
      </div>
      <div className="bottom">
        <div className="cat">#Nature #tech</div>
        <div className="info">
          <p className="author">@Sathak 22kile</p>
          <p>22 mins </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
