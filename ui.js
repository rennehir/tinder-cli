"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const jsonfile = require("jsonfile");
const { Text } = require("ink");

const axios = require("./src/axios");

const App = importJsx("./src/app");
const Login = importJsx("./src/components/login");

const { useState, useEffect } = React;
const file = "/tmp/tcli-data.json";

const UI = () => {
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState();

	useEffect(() => {
		jsonfile
			.readFile(file, { throws: false })
			.then((tokens) => {
				getProfile(tokens);
			})
			.catch((e) => {
				jsonfile.writeFile(file, { refresh_token: "", api_token: "" });
				setLoading(false);
			});
	}, []);

	const getProfile = (tokens) => {
		axios
			.get("/profile", { headers: { "X-Auth-Token": tokens.api_token } })
			.then((result) => {
				setProfile(result.data);
				setLoading(false);
			});
	};

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
