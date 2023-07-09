import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../Styles/blog.css";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { timeDiff } from "./Card";
import "../Styles/notfound.css";
import Loader from "./Loader";
const Blog = () => {
	const { blogId } = useParams();
	const [blog, setBlog] = useState({});
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [author, setAuthor] = useState({});
	useEffect(() => {
		setIsLoading(true);
		const api = axios.create({
			baseURL: "https://shayrana-backend.onrender.com/",
		});
		const fetchBlogDetails = async () => {
			try {
				const response = await api.get(`/blogs/${blogId}`);
				setBlog(response.data.blog);
				setAuthor(response.data.authorDetails);
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setError(true);
			}
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
			{!error ? (
				isLoading ? (
					<Loader />
				) : (
					<>
						<section className="image" style={styles}></section>
						<main>
							<div className="left">
								<h1>{blog?.title}</h1>
								<section dangerouslySetInnerHTML={{ __html: blog?.text }} />
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
						</main>{" "}
					</>
				)
			) : (
				<div className="error">
					<div className="page404">
						<img src="/notfound.svg" alt="Page not found" />

						<h1 className="heading">Oops! Blog not found</h1>
						<p className="subtext">
							The blog you are looking for does not exist.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Blog;
