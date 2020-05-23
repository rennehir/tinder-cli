"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { Box, Color, Text, useInput } = require("ink");
const { Tabs, Tab } = require("ink-tab");

const axios = require("../axios");
const getHeaders = require("../utils/get-headers");

const Person = importJsx("../components/person");
const Messages = importJsx("../components/messages");

const keys = require("../keymappings.json");

const { useState, useEffect } = React;

const Matches = ({ profile }) => {
	const [matches, setMatches] = useState([]);
	const [pages, setPages] = useState([]);
	const [pageIndex, setPageIndex] = useState(0);
	const [activeTab, setActiveTab] = useState(null);
	const [profileSwitcher, setProfileSwitcher] = useState("profile");
	const [isListeningNavigation, setIsListeningNavigation] = useState(true);

	const toggleNavigationListening = () => {
		setIsListeningNavigation(!isListeningNavigation);
	};

	useEffect(() => {
		getUpdates();
	}, []);

	const getUpdates = async (currentActiveTab) => {
		const headers = await getHeaders();
		axios
			.post(
				"/updates",
				{ last_activity_date: "2019-01-01T00:00:00.000Z" },
				{ headers }
			)
			.then(({ data }) => {
				const pages = data.matches.reduce((resultArray, item, index) => {
					const chunkIndex = Math.floor(index / 10);

					if (!resultArray[chunkIndex]) {
						resultArray[chunkIndex] = []; // start a new chunk
					}

					resultArray[chunkIndex].push(item);

					return resultArray;
				}, []);
				setPages(pages);
				setMatches(data.matches);
				setActiveTab(currentActiveTab ? currentActiveTab : data.matches[0]._id);
			});
	};

	const handleTabChange = (name) => {
		setActiveTab(name);
	};

	useInput((input, key) => {
		if (key.escape) {
			toggleNavigationListening();
		}
	});

	useInput((input, key) => {
		if (isListeningNavigation) {
			if (input === keys.MSG.key) {
				// Enter messages
				setProfileSwitcher("messages");
			}
			if (input === keys.SHOW_PERSON.key) {
				// Go back to profile
				setProfileSwitcher("profile");
			}

			if (input === keys.PREV_MATCH_PAGE.key) {
				// Previous matches
				if (pageIndex - 1 >= 0) {
					setPageIndex(pageIndex - 1);
				}
			}
			if (input === keys.NEXT_MATCH_PAGE.key) {
				// Next matches
				if (pageIndex + 1 < pages.length) {
					setPageIndex(pageIndex + 1);
				}
			}
			if (input === keys.REFRESH.key) {
				// Get updates / refresh
				getUpdates(activeTab);
			}
		}
	});

	return (
		<Box flexDirection="column" margin={3}>
			<Text>
				Navigation is: {isListeningNavigation ? "on" : "off"}. Toggle by
				pressing <Color red>ESC</Color>.
			</Text>
			<Text>Your matches</Text>
			<Text>
				Page {pageIndex + 1}/{pages.length}
			</Text>
			<Box marginY={1}>
				<Box>
					{pages.length > 0 && (
						<Tabs
							flexDirection="column"
							width={20}
							marginRight={3}
							keyMap={{ useTab: false, useNumbers: false }}
							onChange={handleTabChange}
						>
							{pages[pageIndex].map((match) => (
								<Tab key={match._id} name={match._id}>
									{(match && match.person && match.person.name) || "Kukkuu"}
								</Tab>
							))}
						</Tabs>
					)}
				</Box>
				<Box width={80}>
					{activeTab && matches.length > 0 && (
						<>
							{profileSwitcher === "profile" && (
								<Box flexDirection="column">
									<Text>
										Matched{" "}
										{Math.round(
											(new Date().getTime() -
												new Date(
													matches.find((m) => m._id === activeTab).created_date
												).getTime()) /
												1000 /
												60 /
												60
										)}{" "}
										hours ago
									</Text>
									<Person
										profile={matches.find((m) => m._id === activeTab).person}
									/>
								</Box>
							)}
							{profileSwitcher === "messages" && (
								<Messages
									profile={profile}
									matchId={matches.find((m) => m._id === activeTab)._id}
									match={matches.find((m) => m._id === activeTab).person}
									messages={matches.find((m) => m._id === activeTab).messages}
									refresh={getUpdates}
									disableTextInput={isListeningNavigation}
								/>
							)}
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

module.exports = Matches;
