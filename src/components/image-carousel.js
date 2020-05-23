"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const { Box, Text, Color, useInput } = require("ink");
const { useState, useEffect } = React;
const importJsx = require("import-jsx");

const keys = require("../keymappings.json");

const Image = importJsx("./image");

const ImageCarousel = ({ urls, nextKey, prevKey }) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		setIndex(0);
	}, [urls]);

	useInput((input, key) => {
		if (input === keys.NEXT_IMAGE.key && index < urls.length - 1) {
			setIndex(index + 1);
		}
		if (input === keys.PREV_IMAGE.key && index > 0) {
			setIndex(index - 1);
		}
	});

	return (
		<Box flexDirection="column" width={56} paddingLeft={3} paddingRight={3}>
			<Box>
				<Box>
					{index < urls.length && (
						<Image
							width={50}
							url={urls[index].processedFiles[1].url}
							ratio={
								urls[index].processedFiles[1].height /
								urls[index].processedFiles[1].width
							}
						/>
					)}
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
