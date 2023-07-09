import React, { useState, useEffect } from "react";
import "../Styles/homepage.css";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Loader from "./Loader";
import Cookies from "js-cookie";
const Homepage = () => {
	const [categories, setCategories] = useState([]);
	const [blogs, setBlogs] = useState([]);
	const [activeCat, setactiveCat] = useState("");
	const [activeSort, setactiveSort] = useState("time");
	const [isBlogsLoading, setIsBlogsLoading] = useState(false);
	const [isCatsLoading, setIsCatsLoading] = useState(false);
	const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
	useEffect(() => {
		setIsBlogsLoading(true);
		setIsCatsLoading(true);
		const api = axios.create({
			baseURL: "https://shayrana-backend.onrender.com/",
		});
		const fetchCategories = async () => {
			const response = await api.get("/cat");
			setCategories(response.data.list);
			setIsCatsLoading(false);
		};

		const fetchBlogs = async () => {
			const response = await api.get("/blogs", {
				params: {
					category: activeCat,
					sort: activeSort,
				},
			});
			setBlogs(response.data.blogs);
			setIsBlogsLoading(false);
		};

		try {
			fetchCategories();
		} catch (err) {
			console.log(err);
		}
		try {
			fetchBlogs();
		} catch (err) {
			console.log(err);
		}
	}, [activeSort, activeCat]);

	const buildCategoryItem = () => {
		return categories.map((category) => {
			if (category.name !== activeCat) {
				return (
					<p
						onClick={(e) => {
							setactiveCat(category.name);
						}}
						key={category._id}
					>
						{category.name}
					</p>
				);
			} else {
				return "";
			}
		});
	};

	return (
		<>
			<Navbar />
			<div className="categoryBar">
				{activeCat !== "" && (
					<p
						className="activecategory"
						onClick={(e) => {
							setactiveCat("");
						}}
					>
						{activeCat}
						<MdOutlineCancel size={18} />
					</p>
				)}
				{isCatsLoading ? (
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
				) : (
					categories.length > 0 && buildCategoryItem()
				)}
			</div>
			<main className="home_main">
				{isMobile && Cookies.get("id") && (
					<div className="add_new">
						<Link to="/newBlog">
							<div className="add_btn">
								<HiOutlinePlusCircle size={32} />
								Create New Blog
							</div>
						</Link>
					</div>
				)}

				<div className="filter">
					<select
						className="filter_options"
						onChange={(e) => {
							setactiveSort(e.target.value);
						}}
					>
						<option value="time">Time</option>
						<option value="views">Views</option>
					</select>
				</div>
				<div className="blogs_wrapper">
					{isBlogsLoading ? (
						<Loader />
					) : (
						<div className="blogs">
							{blogs.length > 0 &&
								blogs.map((blog) => {
									return (
										<Card
											key={blog._id}
											blog={blog}
											author={blog?.author}
											cate={blog.categories}
										/>
									);
								})}
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default Homepage;
