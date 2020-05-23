"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { Box, Color, Text, useInput } = require("ink");
const { Tabs, Tab } = require("ink-tab");

const axios = require("../axios");
const getHeaders = require("../utils/get-headers");

const Person = importJsx("../components/person");

const { useState, useEffect } = React;

const Matches = ({ profile }) => {
	const [matches, setMatches] = useState([]);
	const [activeTab, setActiveTab] = useState(null);
	const [profileSwitcher, setProfileSwitcher] = useState("profile");

	useEffect(() => {
		const fetch = async () => {
			const headers = await getHeaders();
			axios
				.post(
					"/updates",
					{ last_activity_date: "2019-01-01T00:00:00.000Z" },
					{ headers }
				)
				.then(({ data }) => {
					setMatches(data.matches);
					setActiveTab(data.matches[0]._id);
				});
		};
		fetch();
	}, []);

	const handleTabChange = (name) => {
		setActiveTab(name);
	};

	useInput((input, key) => {
		if (input === "m") {
			// Enter messages
			setProfileSwitcher("messages");
		}
		if (input === "p") {
			// Go back to profile
			setProfileSwitcher("profile");
		}
	});

	return (
		<Box flexDirection="column" margin={3}>
			<Text>Your matches</Text>
			<Box marginY={1}>
				<Tabs
					flexDirection="column"
					width={20}
					marginRight={3}
					keyMap={{ useTab: false, useNumbers: false }}
					onChange={handleTabChange}
				>
					{matches.map((match) => (
						<Tab key={match._id} name={match._id}>
							{(match.person && match.person.name) || "Kukkuu"}
						</Tab>
					))}
				</Tabs>
				{activeTab && matches.length > 0 && (
					<>
						{profileSwitcher === "profile" && (
							<Person
								profile={matches.find((m) => m._id === activeTab).person}
							/>
						)}
						{profileSwitcher === "messages" && (
							<Messages
								profile={profile}
								messages={matches.find((m) => m._id === activeTab).messages}
							/>
						)}
					</>
				)}
			</Box>
		</Box>
	);
};

const Messages = ({ messages, profile }) => {
	const { _id: ownId } = profile;

	return (
		<Box flexDirection="column">
			{messages.map((m) => (
				<Message message={m.message} isOwnMessage={ownId === m.from} />
			))}
		</Box>
	);
};

const Message = ({ message, isOwnMessage, matchName, sent_date }) => {
	return (
		<Box padding={1}>
			<Color blue={isOwnMessage} yellow={!isOwnMessage}>
				{message}
			</Color>
		</Box>
	);
};

module.exports = Matches;
