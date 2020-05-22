"use strict";
const importJsx = require("import-jsx");
const React = require("react");
const { Box, Text, useInput } = require("ink");
const getHeaders = require("../utils/get-headers");
const axios = require("../../src/axios");

const ImageCarousel = importJsx("../components/image-carousel");

const { useState, useEffect } = React;

const Feed = () => {
	const [loading, setLoading] = useState(true);
	const [recs, setRecs] = useState();
	const [currRec, setCurrRec] = useState();

	const getRecs = async () => {
		const headers = await getHeaders();
		axios
			.get("/user/recs", { headers })
			.then((result) => {
				setRecs(result.data.results);
				setCurrRec(result.data.results[0]);
				setLoading(false);
			})
			.catch((e) => {
				console.log("There's no one new around you.", e.message);
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
				}
			})
			.catch((e) => {
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	useInput((input, key) => {
		if (!!currRec && input.toUpperCase() === "L") {
			likeRec();
		}
		if (!!currRec && input.toUpperCase() === "P") {
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
					<Text>{currRec.name}</Text>
					<Text>{currRec.bio}</Text>
					<ImageCarousel urls={currRec.photos} prevKey="q" nextKey="w" />
					<Text>"P to pass ||| L to like"</Text>
				</>
			)}
		</Box>
	);
};

module.exports = Feed;
