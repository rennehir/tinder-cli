"use strict";
const importJsx = require("import-jsx");
const React = require("react");
const { Box, Text, useInput } = require("ink");
const getHeaders = require("../utils/get-headers");
const axios = require("../../src/axios");

const Person = importJsx("../components/person");
const Gz = importJsx("../components/gz");

const keys = require("../keymappings.json");

const { useState, useEffect } = React;

const Feed = () => {
	const [loading, setLoading] = useState(true);
	const [recs, setRecs] = useState();
	const [currRec, setCurrRec] = useState();
	const [match, setMatch] = useState(false);

	const getRecs = async () => {
		const headers = await getHeaders();
		axios
			.get("/user/recs", { headers })
			.then((result) => {
				if (result.data.results) {
					setRecs(result.data.results);
					setCurrRec(result.data.results[0]);
				}
				setLoading(false);
			})
			.catch((e) => {
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	const passRec = async () => {
		const headers = await getHeaders();
		axios
			.get(`/pass/${currRec._id}`, { headers })
			.then((result) => {
				if (result.status === 200) {
					setLoading(true);
					setCurrRec(undefined);
					getRecs();
				}
			})
			.catch((e) => {
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	const likeRec = async () => {
		const headers = await getHeaders();
		axios
			.get(`/like/${currRec._id}`, { headers })
			.then((result) => {
				if (result.status === 200) {
					setLoading(true);
					setCurrRec(undefined);
					getRecs();
					if (result.match) {
						setMatch(true);
						setTimeout(() => setMatch(false), 5000);
					}
				}
			})
			.catch((e) => {
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	useInput((input, key) => {
		if (!!currRec && input === keys.LIKE.key) {
			likeRec();
		}
		if (!!currRec && input === keys.PASS.key) {
			passRec();
		}
	});

	useEffect(() => {
		getRecs();
	}, []);

	return (
		<Box margin={3} flexDirection="column">
			{loading && <Text>Loading...</Text>}
			{recs && currRec && (
				<>
					<Person profile={currRec} />
					{match ? <Gz /> : null}
				</>
			)}
		</Box>
	);
};

module.exports = Feed;
