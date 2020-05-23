"use strict";
const React = require("react");
const { Box, Color, Text } = require("ink");

const asciiLogo =
	" ________  ___       ___  _________   \n|\\   ____\\|\\  \\     |\\  \\|\\___   ___\\ \n\\ \\  \\___|\\ \\  \\    \\ \\  \\|___ \\  \\_| \n \\ \\  \\    \\ \\  \\    \\ \\  \\   \\ \\  \\  \n  \\ \\  \\____\\ \\  \\____\\ \\  \\   \\ \\  \\ \n   \\ \\_______\\ \\_______\\ \\__\\   \\ \\__\\\n    \\|_______|\\|_______|\\|__|    \\|__|";

const Logo = () => {
	return (
		<Box flexDirection="column">
			<Color red>
				<Text bold>{asciiLogo}</Text>
			</Color>
			<Text>Command Line Interface for Tinder</Text>
		</Box>
	);
};

module.exports = Logo;
