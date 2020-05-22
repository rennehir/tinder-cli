"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Box, Text, useInput } = require("ink");
const { useState } = React;
const importJsx = require("import-jsx");

const Image = importJsx("./image");

const ImageCarousel = ({ urls, nextKey, prevKey }) => {
	const [index, setIndex] = useState(0);

	useInput((input, key) => {
		if (input === prevKey && index < urls.length - 1) {
			setIndex(index + 1);
		}
		if (input === nextKey && index > 0) {
			setIndex(index - 1);
		}
	});

	return (
		<Box>
			<Box width={3} justifyContent="center">
				{index > 0 && <Text bold>{"<"}</Text>}
			</Box>
			<Box>
				<Image url={urls[index].processedFiles[1].url} />
			</Box>
			<Box width={3} justifyContent="center">
				{index < urls.length - 1 && <Text bold>{">"}</Text>}
			</Box>
		</Box>
	);
};

ImageCarousel.propTypes = {
	urls: PropTypes.array, // Syö profiilin photos arrayn
	nextKey: PropTypes.string,
	prevKey: PropTypes.string,
};

module.exports = ImageCarousel;
