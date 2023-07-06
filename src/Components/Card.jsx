import React from "react";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
export const timeDiff = (date) => {
  const targetDate = new Date(date);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - targetDate.getTime();

  // Calculating the difference in days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (days > 0) return days + " days";
  else if (hours > 0) return hours + " hrs";
  else if (minutes > 0) return minutes + " mins";
  else return seconds + " secs";
};

const Card = ({ blog, cate, author, owner = false }) => {
  const url = blog?.image
    ? blog?.image
    : "https://images.unsplash.com/photo-1688362379195-b8c04f735968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
  const styles = {
    backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.044), rgba(0, 0, 0, 0.873)), url(${url})`,
    backgroundSize: "cover",
  };

  const handleDelete = async () => {
    const api = axios.create({
      baseURL: "https://shayrana-backend.onrender.com/",
    });
    try {
      const result = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!result) return;
      const response = await api.delete(`/blogs/${blog?._id}`);
      if (response?.data.success === true) {
        window.location.reload();
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    const api = axios.create({
      baseURL: "https://shayrana-backend.onrender.com/",
    });
    try {
      const response = await api.put(`/blogs/view/${blog?._id}`);
      if (response?.data.success === true) {
        window.location.href = `/blog/${blog?._id}`;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card" style={styles}>
      <div className="top">
        <div className="views">
          <HiEye />
          {blog?.views}
        </div>
      </div>
      <div className="card-body" onClick={handleClick}>
        {blog?.title}
      </div>

      <div className="bottom">
        <div className="cat">
          {cate?.map((cat) => {
            return <span key={cat._id}>#{cat.name}</span>;
          })}
        </div>

        <div className="info">
          <span>
            <Link to={`/user/${author._id}`}>
              <p className="author">@{author?.fname}</p>
            </Link>
          </span>
          {owner && (
            <span className="cta" onClick={() => handleDelete()}>
              <RiDeleteBin2Fill />
            </span>
          )}
          {owner && (
            <span className="cta">
              <Link to={`/edit/${blog?._id}`}>
                <TbEdit />
              </Link>
            </span>
          )}
          <p>{timeDiff(blog?.time)} </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
