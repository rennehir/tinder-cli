"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { UncontrolledTextInput } = require("ink-text-input");
const { Box, Color, Text } = require("ink");

const axios = require("../../axios");
const getHeaders = require("../../utils/get-headers");
const Message = importJsx("./message");

const Messages = ({
	messages,
	match,
	matchId,
	profile,
	refresh,
	disableTextInput,
}) => {
	const { _id: ownId } = profile;

	const handleSubmit = async (message) => {
		const headers = await getHeaders();
		axios
			.post(`/user/matches/${matchId}`, { message }, { headers })
			.then((result) => {
				refresh();
			});
	};

	return (
		<Box flexDirection="column">
			{messages.length > 0 ? (
				messages.map((m) => (
					<Message
						key={m._id}
						message={m.message}
						matchName={match.name}
						isOwnMessage={ownId === m.from}
						sent_date={m.sent_date}
					/>
				))
			) : (
				<Text>No messages</Text>
			)}
			<NewMessage onSubmit={handleSubmit} disabled={disableTextInput} />
		</Box>
	);
};

const NewMessage = ({ onSubmit, disabled }) => {
	return (
		<Box marginY={3}>
			<Text>Message: </Text>
			{!disabled ? (
				<UncontrolledTextInput onSubmit={onSubmit} />
			) : (
				<Text>
					<Color green>Press esc to start writing</Color>
				</Text>
			)}
		</Box>
	);
};

module.exports = Messages;
