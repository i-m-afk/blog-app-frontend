import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Card, { timeDiff } from "./Card";
import Cookies from "js-cookie";
import "../Styles/user.css";
import "../Styles/notfound.css";
import Loader from "./Loader";

const User = () => {
	const { userId } = useParams();
	const [blog, setBlog] = useState([]);
	const [author, setAuthor] = useState({});
	const [owner, setOwner] = useState(false);
	const [error, setError] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	useEffect(() => {
		const api = axios.create({
			baseURL: "https://shayrana-backend.onrender.com/",
		});
		const fetchUserDetails = async () => {
			try {
				setIsFetching(true);
				const response = await api.get(`/users/${userId}`);
				if (response.data.success === true) {
					setAuthor(response.data.user);
					setBlog(response.data.blogs);
					if (Cookies.get("login") && Cookies.get("id") === userId) {
						setOwner(true);
					}
					setIsFetching(false);
				} else {
					setError(true);
				}
			} catch (err) {
				console.log(err);
				setError(true);
			}
		};
		try {
			fetchUserDetails();
		} catch (err) {
			console.log(err);
		}
	}, [userId]);

	const dateB = new Date(author?.dob);
	const mth = dateB.getMonth() + 1;
	return (
		<div className="userpage">
			<Navbar />
			{!error ? (
				isFetching ? (
					<Loader />
				) : (
					<>
						<div className="userDetails">
							<h1>{author?.fname + " " + author?.lname}</h1>
							<div className="details">
								<div className="left">
									<p>{author?.email}</p>
									<p>
										Born{" "}
										{dateB.getDate() + "/" + mth + "/" + dateB.getFullYear()}{" "}
									</p>
									<p>Joined {timeDiff(author?.doc)} ago</p>
								</div>
								<div className="right">
									<p>{author?.blogCount} Blogs</p>
									<p>{author?.viewCount} Views</p>
								</div>
							</div>
						</div>
						<h2>BLOGPOSTS</h2>
						<div className="blogs_wrapper">
							<section className="blogs userBlogs">
								{blog.length > 0 &&
									blog.map((blg) => {
										return (
											<Card
												key={blg._id}
												blog={blg}
												author={author}
												owner={owner}
											>
												Hello
											</Card>
										);
									})}
							</section>
						</div>
					</>
				)
			) : (
				<div className="error">
					<div className="page404">
						<img src="/notfound.svg" alt="Page not found" />

						<h1 className="heading">Oops! User not found</h1>
						<p className="subtext">
							The user you are looking for does not exist.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default User;
