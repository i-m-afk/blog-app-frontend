import React, { useEffect, useState } from "react";
import "../Styles/styles.css";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
const EditBlog = () => {
  const { blogId } = useParams();
  if (!Cookies.get("login")) {
    window.location.href = "/";
  }
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [blog, setBlog] = useState({});

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://shayrana-backend.onrender.com/",
    });
    const getBlog = async () => {
      try {
        const response = await api.get(`/blogs/${blogId}`);
        if (response.data.success === true) {
          setBlog(response.data.blog);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBlog();
  }, [blogId]);

  const onSubmit = async (data) => {
    const api = axios.create({
      baseURL: "https://shayrana-backend.onrender.com/",
    });
    setServerError("");
    const cats = data.categories.split(",").map((item) => item.trim());

    try {
      const response = await api.put(
        `/blogs/${blogId}`,
        {
          title: data.title,
          text: data.text,
          image: data.image_url,
          categories: cats,
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
        window.location.href = "/";
      }
    } catch (error) {
      setServerError(error.response?.data?.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="form-wrapper login">
        <div className="form-container">
          <h2 className="form-subheader">Update Blog</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input_grp">
              <label htmlFor="title">Title:</label>
              <input
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
                type="text"
                id="title"
                name="title"
                required
                defaultValue={blog.title}
              />
            </div>
            <div className="input_grp">
              <label htmlFor="text">Text:</label>
              <textarea
                name="text"
                id="text"
                {...register("text", {
                  required: {
                    value: true,
                    message: "Text is required",
                  },
                })}
                rows={5}
                required
                defaultValue={blog.text}
              />
            </div>
            <div className="input_grp">
              <label htmlFor="image_url">
                Image URL (can be empty or Unsplash URL)
              </label>
              <input
                {...register("image_url")}
                type="text"
                id="image_url"
                name="image_url"
                defaultValue={blog.image}
              />
            </div>
            <div className="input_grp">
              <label htmlFor="categories">
                Categories: ( Comma Seperated ){" "}
              </label>
              <input
                {...register("categories", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
                type="text"
                id="categories"
                name="categories"
                required
              />
            </div>
            <div className="errors">
              {errors.title?.message ||
                errors.text?.message ||
                errors.image_url?.message ||
                errors.categories?.message ||
                serverError}
            </div>
            <button type="submit" className="primary_btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditBlog;
