"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Box } = require("ink");
const { useState } = React;
const terminalArt = require("terminal-art");

const ERROR_TITS_URL =
	"http://www.sexytitflash.com/bigimages/very%20big%20tits%2092619412%20153.jpg";

const Image = ({ url, width }) => {
	const [content, setContent] = useState(null);

	const img = terminalArt
		.toAnsii(url, {
			maxCharWidth: width,
		})
		.then((data) => {
			setContent(data);
		})
		.catch((error) => {
			const tits = terminalArt
				.toAnsii(ERROR_TITS_URL, {
					maxCharWidth: width,
				})
				.then((data) => {
					setContent(data);
				})
				.catch((err) => {
					setContent(null);
				});
		});

	return (
		<>
			{content ? (
				<Box>{content}</Box>
			) : (
				<Box width={width} height={width * 1.25}>
					Loading...
				</Box>
			)}
		</>
	);
};

Image.propTypes = {
	url: PropTypes.string,
	width: PropTypes.number,
};

module.exports = Image;
