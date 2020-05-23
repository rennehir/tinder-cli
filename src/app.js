"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { Box } = require("ink");
const { Tabs, Tab } = require("ink-tab");

const Feed = importJsx("./pages/feed");
const Matches = importJsx("./pages/matches");
const Profile = importJsx("./pages/profile");
const Travel = importJsx("./pages/travel");
const Logo = importJsx("./components/logo");
const Help = importJsx("./components/help");

const { useState } = React;

const App = ({ profile }) => {
	const [activeTab, setActiveTab] = useState(null);

	// the handleTabChange method get two arguments:
	// - the tab name
	// - the React tab element
	const handleTabChange = (name, activeTab) => {
		// set the active tab name to do what you want with the content
		setActiveTab(name);
	};

	return (
		<Box flexDirection="column">
			<Logo />
			<Tabs onChange={handleTabChange}>
				<Tab name="feed">Feed</Tab>
				<Tab name="matches">Matches</Tab>
				<Tab name="profile">Profile</Tab>
				{/* <Tab name="travel">Travel</Tab> */}
			</Tabs>

			{activeTab === "feed" && <Feed />}
			{activeTab === "matches" && <Matches profile={profile} />}
			{activeTab === "profile" && <Profile profile={profile} />}
			{false && <Travel />}
			<Help activeTab={activeTab} />
		</Box>
	);
};

module.exports = App;
