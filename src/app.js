"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { Box, Text, useInput } = require("ink");

const Feed = importJsx("./pages/feed");
const Matches = importJsx("./pages/matches");
const Profile = importJsx("./pages/profile");

const { useState } = React;

const App = ({ profile }) => {
	const [currentPage, setCurrentPage] = useState(1);
	useInput((input, key) => {
		if (input === "1") {
			// Feed
			setCurrentPage(1);
		}
		if (input === "2") {
			// Matches
			setCurrentPage(2);
		}
		if (input === "3") {
			// Profile
			setCurrentPage(3);
		}
	});

	return (
		<Box>
			{currentPage === 1 && <Feed />}
			{currentPage === 2 && <Matches />}
			{currentPage === 3 && <Profile />}
		</Box>
	);
};

module.exports = App;
