"use strict";
const React = require("react");
const { Box, Color, Text } = require("ink");

const Message = ({ message, isOwnMessage, matchName, sent_date }) => {
	const ago = Math.round(
		(new Date().getTime() - new Date(sent_date).getTime()) / 1000
	);

	return (
		<Box padding={1} flexDirection="column" marginLeft={isOwnMessage ? 5 : 0}>
			<Text>
				{isOwnMessage ? "You" : matchName} <Text italic>{ago} seconds ago</Text>
			</Text>
			<Box marginBottom={1} width={50} textWrap="wrap">
				<Text bold>
					<Color blue={isOwnMessage} yellow={!isOwnMessage}>
						{message}
					</Color>
				</Text>
			</Box>
		</Box>
	);
};

module.exports = Message;
