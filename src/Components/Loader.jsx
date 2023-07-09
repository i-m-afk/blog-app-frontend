import React from "react";
import { Rings } from "react-loader-spinner";
const Loader = () => {
	return (
		<div className="loader">
			<Rings
				height="120"
				width="120"
				color="#c33c3c"
				radius="100"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="rings-loading"
			/>
			<h3 className="heading">Fetching data from server</h3>
			<p className="subtext">
				The server is hosted on free platform, it may take upto{" "}
				<strong>30s</strong> to start.
			</p>
		</div>
	);
};

export default Loader;
