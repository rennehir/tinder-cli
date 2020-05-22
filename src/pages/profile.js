"use strict";
const React = require("react");
const { Box, Text } = require("ink");
const getHeaders = require("../utils/get-headers");
const axios = require("../../src/axios");
const importJsx = require("import-jsx");

const { useState, useEffect } = React;

const Person = importJsx("../components/person");

const Profile = () => {
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState();

	const getProfile = async () => {
		const headers = await getHeaders();
		axios
			.get("/profile", { headers })
			.then(result => {
				setLoading(false);
				setProfile(result.data);
			})
			.catch(e => {
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	useEffect(() => {
		getProfile();
	}, []);
	return (
		<Box margin={3}>
			{loading && <Text>Loading...</Text>}
			{profile && <Person profile={profile} />}
		</Box>
	);
};

module.exports = Profile;
