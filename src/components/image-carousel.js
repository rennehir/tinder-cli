"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Box, Text, Color, useInput } = require("ink");
const { useState, useEffect } = React;
const importJsx = require("import-jsx");

const Image = importJsx("./image");

const ImageCarousel = ({ urls, nextKey, prevKey }) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		setIndex(0);
	}, [urls]);

	useInput((input, key) => {
		if (input === nextKey && index < urls.length - 1) {
			setIndex(index + 1);
		}
		if (input === prevKey && index > 0) {
			setIndex(index - 1);
		}
	});

	return (
		<Box flexDirection="column" width={56}>
			<Box>
				<Box width={3} justifyContent="center">
					{index > 0 && <Text bold>{"<"}</Text>}
				</Box>
				<Box>
					{index < urls.length && (
						<Image width={50} url={urls[index].processedFiles[1].url} />
					)}
				</Box>
				<Box width={3} justifyContent="center">
					{index < urls.length - 1 && <Text bold>{">"}</Text>}
				</Box>
			</Box>
			<Box justifyContent="center">
				{urls.map((val, ind) => {
					return (
						<Box key={ind} width={3} justifyContent="center">
							<Text bold={ind == index}>
								<Color hex={ind == index ? "#FF69B4" : "#783756"}>o</Color>
							</Text>
						</Box>
					);
				})}
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
