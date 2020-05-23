"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Box } = require("ink");
const { useState } = React;
const terminalArt = require("terminal-art");

const ERROR_TITS_URL =
	"http://www.sexytitflash.com/bigimages/very%20big%20tits%2092619412%20153.jpg";

const Image = ({ url }) => {
	const [content, setContent] = useState("Loading image...");

	const img = terminalArt
		.toAnsii(url, {
			maxCharWidth: 60 // my terminal is only 20 characters wide
		})
		.then(data => {
			setContent(data);
		})
		.catch(error => {
			const tits = terminalArt
				.toAnsii(ERROR_TITS_URL, {
					maxCharWidth: 60
				})
				.then(data => {
					setContent(data);
				})
				.catch(err => {
					setContent("Error");
				});
		});

	return <Box>{content}</Box>;
};

Image.propTypes = {
	url: PropTypes.string
};

module.exports = Image;
