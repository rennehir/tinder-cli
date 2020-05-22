"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Box } = require("ink");
const { useState } = React;
const terminalArt = require("terminal-art");

const Image = ({ url }) => {
	const [content, setContent] = useState("Loading image...");

	const img = terminalArt
		.toAnsii(url, {
			maxCharWidth: 60, // my terminal is only 20 characters wide
		})
		.then((data) => {
			setContent(data);
		})
		.catch((error) => {
			setContent("Error");
		});

	return <Box>{content}</Box>;
};

Image.propTypes = {
	url: PropTypes.string,
};

module.exports = Image;
