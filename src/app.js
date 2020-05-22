"use strict";
const React = require("react");
const { Box, Text, useInput } = require("ink");

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
			{currentPage === 1 && <Text>Feed</Text>}
			{currentPage === 2 && <Text>Matches</Text>}
			{currentPage === 3 && <Text>Profile</Text>}
		</Box>
	);
};

module.exports = App;
