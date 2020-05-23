"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Box } = require("ink");
const { useState } = React;
const terminalArt = require("terminal-art");

const ERROR_TITS_URL =
	"http://www.sexytitflash.com/bigimages/very%20big%20tits%2092619412%20153.jpg";

const VIEWPORT_RATIO = 1.25;

const Image = ({ url, width, ratio }) => {
	const [content, setContent] = useState(null);

	const height = ratio * width;
	const viewportHeight = VIEWPORT_RATIO * width;
	const viewportHeightDiff = parseInt(viewportHeight - height);

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
				<Box flexDirection="column">
					{viewportHeightDiff > 0 && (
						<Box height={viewportHeightDiff / 4}></Box>
					)}
					<Box>{content}</Box>
					{viewportHeightDiff > 0 && (
						<Box height={viewportHeightDiff / 4}></Box>
					)}
				</Box>
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
	ratio: PropTypes.number,
};

module.exports = Image;
