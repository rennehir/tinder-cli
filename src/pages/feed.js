"use strict";
const importJsx = require("import-jsx");
const React = require("react");
const { Box, Text } = require("ink");
const getHeaders = require("../utils/get-headers");
const axios = require("../../src/axios");

const ImageCarousel = importJsx("../components/image-carousel");

const { useState, useEffect } = React;

const Feed = () => {
	const [loading, setLoading] = useState(true);
	const [recs, setRecs] = useState();

	const getRecs = async () => {
		const headers = await getHeaders();
		axios
			.get("/user/recs", { headers })
			.then((result) => {
				setRecs(result.data.results);
				setLoading(false);
			})
			.catch((e) => {
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	useEffect(() => {
		getRecs();
	}, []);

	return (
		<Box margin={3} flexDirection="column">
			{loading && <Text>Loading...</Text>}
			{recs && (
				<>
					<Text>{recs[0].name}</Text>
					<ImageCarousel urls={recs[0].photos} prevKey="q" nextKey="w" />
					<Text>{recs.length}</Text>
				</>
			)}
		</Box>
	);
};

module.exports = Feed;
