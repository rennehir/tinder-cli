"use strict";
const React = require("react");
const { Box, Text } = require("ink");

const App = ({ profile }) => {
	return (
		<Box>
			<Text>Kukkuu saatana, {profile.name || "sinä"}</Text>
		</Box>
	);
};

module.exports = App;
