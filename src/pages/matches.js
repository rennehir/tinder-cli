"use strict";
const React = require("react");
const { Box, Text } = require("ink");
const { Tabs, Tab } = require("ink-tab");

const axios = require("../axios");
const getHeaders = require("../utils/get-headers");

const { useState, useEffect } = React;

const Matches = () => {
	const [matches, setMatches] = useState([]);
	const [activeTab, setActiveTab] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			const headers = await getHeaders();
			axios.get("/v2/matches?count=10", { headers }).then(({ data }) => {
				setMatches(data.data.matches);
				setActiveTab(data.data.matches[0]._id);
			});
		};
		fetch();
	}, []);

	const handleTabChange = (name) => {
		setActiveTab(name);
	};

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
							{match.person.name}
						</Tab>
					))}
				</Tabs>
				{activeTab && matches.length > 0 && (
					<Person person={matches.find((m) => m._id === activeTab).person} />
				)}
			</Box>
		</Box>
	);
};

const Person = ({ person }) => {
	return person.name && <Text>{person.name}</Text>;
};

module.exports = Matches;
