import React, { useState } from "react";
import "../Styles/styles.css";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";
const NewPost = () => {
	if (!Cookies.get("login")) {
		window.location.href = "/";
	}
	const [serverError, setServerError] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({});

	const api = axios.create({
		baseURL: "https://shayrana-backend.onrender.com/",
	});

	const [value, setValue] = useState("");
	const curruserid = Cookies.get("id");

	const onSubmit = async (data) => {
		setServerError("");
		const cats = data.categories.split(",").map((item) => item.trim());
		if (cats[cats.length - 1] === "") {
			cats.pop();
		}
		// console.log(data.image_url);

		try {
			const response = await api.post(
				"/blogs",
				{
					title: data.title,
					text: value,
					image: data.image_url,
					categories: cats,
					userid: curruserid,
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
					<h2 className="form-subheader">Create New Blog</h2>
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
							/>
						</div>
						<div className="input_grp">
							<label htmlFor="text">Text:</label>
							<ReactQuill
								className="quill"
								id="text"
								theme="snow"
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
							{/* <button
                onClick={() => {
                  console.log(value);
                }}
              > */}
							{/* show */}
							{/* </button> */}
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
                defaultValue={""}
              /> */}
						</div>
						<div className="input_grp">
							<label htmlFor="image_url">
								Image URL (can be empty or use Unsplash )
							</label>
							<input
								{...register("image_url")}
								type="text"
								id="image_url"
								name="image_url"
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
							Publish
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
export default NewPost;
