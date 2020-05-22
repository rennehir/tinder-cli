"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { Text } = require("ink");

const axios = require("./src/axios");
const getHeaders = require("./src/utils/get-headers");

const App = importJsx("./src/app");
const Login = importJsx("./src/components/login");

const { useState, useEffect } = React;

const UI = () => {
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState();

	const getProfile = async () => {
		const headers = await getHeaders();
		axios
			.get("/profile", { headers })
			.then((result) => {
				setProfile(result.data);
				setLoading(false);
			})
			.catch((e) => {
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	useEffect(() => {
		getProfile();
	}, []);

	const handleLoginSuccessful = (tokens) => {
		getProfile(tokens);
	};

	return (
		<>
			{loading && <Text>Loading...</Text>}
			{profile && <App profile={profile} />}
			{!loading && !profile && (
				<Login loginSuccessful={handleLoginSuccessful} />
			)}
		</>
	);
};

module.exports = UI;
