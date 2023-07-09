import React, { useEffect, useState } from "react";
import "../Styles/styles.css";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { ThreeDots } from "react-loader-spinner";
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
	const [value, setValue] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const api = axios.create({
			baseURL: "https://shayrana-backend.onrender.com/",
		});
		const getBlog = async () => {
			try {
				setIsFetching(true);
				const response = await api.get(`/blogs/${blogId}`);
				if (response.data.success === true) {
					setBlog(response.data.blog);
					setValue(response.data.blog.text);
				}
				setIsFetching(false);
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
		if (cats[cats.length - 1] === "") {
			cats.pop();
		}

		try {
			setIsSubmitting(true);
			const response = await api.put(
				`/blogs/${blogId}`,
				{
					title: data.title,
					text: value,
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
			setIsSubmitting(false);
			if (response?.data.success === true) {
				window.location.href = "/";
			}
		} catch (error) {
			setServerError(error.response?.data?.message);
		}
	};

	const handleQuill = (e) => {
		const sanitizedContent = DOMPurify.sanitize(e);
		console.log(sanitizedContent);
		setValue(sanitizedContent);
	};
	return (
		<>
			<Navbar />
			<div className="form-wrapper login">
				<div className="form-container">
					<h2 className="form-subheader">Update Blog</h2>
					{isFetching && (
						<div className="loader">
							<ThreeDots
								height="40"
								width="80"
								radius="9"
								color="#c33c3c"
								ariaLabel="three-dots-loading"
								wrapperStyle={{}}
								wrapperClassName=""
								visible={true}
							/>
						</div>
					)}
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
							<ReactQuill
								id="text"
								theme="snow"
								className="quill"
								value={value}
								onChange={handleQuill}
								modules={{
									toolbar: [
										[{ header: [1, 2, 3, 4, false] }],
										["bold", "italic", "underline", "strike", "blockquote"],
										[{ list: "ordered" }, { list: "bullet" }],
										["link"],
										["clean"],
									],
								}}
							/>
							{/* <textarea
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
              /> */}
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
								"Update"
							)}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
export default EditBlog;
