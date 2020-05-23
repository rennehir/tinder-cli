"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { Box, Text } = require("ink");

const Message = importJsx("./message");

const Messages = ({ messages, match, profile }) => {
	const { _id: ownId } = profile;

	return (
		<Box flexDirection="column">
			{messages.length > 0 ? (
				messages.map((m) => (
					<Message
						message={m.message}
						matchName={match.name}
						isOwnMessage={ownId === m.from}
						sent_date={m.sent_date}
					/>
				))
			) : (
				<Text>No messages</Text>
			)}
		</Box>
	);
};

module.exports = Messages;
