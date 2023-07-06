import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../Styles/blog.css";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { timeDiff } from "./Card";
const Blog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});

  const [author, setAuthor] = useState({});
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://shayrana-backend.onrender.com/",
    });
    const fetchBlogDetails = async () => {
      const response = await api.get(`/blogs/${blogId}`);
      setBlog(response.data.blog);
      setAuthor(response.data.authorDetails);
    };
    try {
      fetchBlogDetails();
    } catch (err) {
      console.log(err);
    }
  }, [blogId]);

  const url = blog?.image
    ? blog?.image
    : "https://images.unsplash.com/photo-1688362379195-b8c04f735968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
  const styles = {
    backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.044), rgba(0, 0, 0, 0.873)), url(${url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="blog">
      <Navbar />
      <section className="image" style={styles}></section>
      <main>
        <div className="left">
          <h1>{blog?.title}</h1>
          <p>{blog?.text}</p>
        </div>
        <div className="right">
          <Link to={`/user/${author.id}`}>
            <div className="author">
              <FaUserCircle size={34} color="#2d2d2d" />
              <span>{author?.fname + " " + author?.lname}</span>
            </div>
          </Link>

          <p>{author?.email}</p>
          <p>Views : {blog?.views}</p>
          <p>Published {timeDiff(blog?.time)} ago</p>
        </div>
      </main>
    </div>
  );
};

export default Blog;
