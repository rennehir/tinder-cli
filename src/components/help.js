"use strict";
const React = require("react");
const { Box, Text, Color } = require("ink");
const PropTypes = require("prop-types");

const keys = require("../keymappings.json");
const Help = ({ activeTab }) => {
	const keymappings = Object.keys(keys).filter(
		(value) => keys[value].page.indexOf(activeTab) >= 0
	);

	return (
		<Box>
			{keymappings.map((obj, ind) => (
				<Text>
					[ <Color red>{keys[obj].key.toUpperCase()}</Color> {keys[obj].label} ]
				</Text>
			))}
		</Box>
	);
};

Help.propTypes = {
	page: PropTypes.string,
};

module.exports = Help;
