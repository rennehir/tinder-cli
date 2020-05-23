"use strict";
const importJsx = require("import-jsx");
const React = require("react");
const { Box, Text, Color, useInput } = require("ink");
const getHeaders = require("../utils/get-headers");
const axios = require("../../src/axios");

const { useState, useEffect } = React;

const CITIES = {
	BANGKOK: {
		lat: 13.736717,
		lon: 100.523186
	},
	JYVASKYLA: {
		lat: 62.24147,
		lon: 25.72088
	},
	OTANIEMI: {
		lat: 60.1806766,
		lon: 24.8306462
	},
	MILANO: {
		lat: 24.8306462,
		lon: 9.18854
	},
	NEW_YORK: {
		lat: 40.73061,
		lon: -73.935242
	}
};

const Travel = () => {
	const [loading, setLoading] = useState(false);
	const [currSelection, setCurrSelection] = useState("BANGKOK");

	useInput((input, key) => {
		if (input.toUpperCase() === "B") {
			setCurrSelection("BANGKOK");
		}
		if (input.toUpperCase() === "J") {
			setCurrSelection("JYVASKYLA");
		}
		if (input.toUpperCase() === "O") {
			setCurrSelection("OTANIEMI");
		}
		if (input.toUpperCase() === "M") {
			setCurrSelection("MILANO");
		}
		if (input.toUpperCase() === "N") {
			setCurrSelection("NEW_YORK");
		}
		if (input.toUpperCase() === "R") {
			setCurrSelection("reset");
		}
		if (key.return) {
			dispatch();
		}
	});

	const resetLocation = async () => {
		const headers = await getHeaders();
		axios
			.post("/passport/user/reset", {}, { headers })
			.then(res => {
				console.log(res);
				setLoading(false);
			})
			.catch(e => {
				setLoading(false);
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	//TODO: this doesn't work
	const setLocation = async () => {
		const body = CITIES[currSelection];
		const headers = await getHeaders();
		axios
			.post("/passport/user/travel", body, { headers })
			.then(res => {
				console.log(JSON.stringify(res.data));
				setLoading(false);
			})
			.catch(e => {
				setLoading(false);
				console.log("Error", JSON.stringify(e, null, 2));
			});
	};

	const dispatch = () => {
		if (currSelection === "reset") {
			setLoading(true);
			resetLocation();
		} else if (!!CITIES[currSelection]) {
			setLoading(true);
			setLocation();
		}
		return;
	};

	return (
		<Box margin={3} flexDirection="column">
			{!loading && (
				<>
					<Text>Go travel! </Text>
					<Box margin={2} flexDirection="column">
						<Text>
							<Color grey>- B -</Color> BANGOK
						</Text>
						<Text>
							<Color grey>- J -</Color> JYVASKYLA
						</Text>
						<Text>
							<Color grey>- O -</Color> OTANIEMI
						</Text>
						<Text>
							<Color grey>- M -</Color> MILANO
						</Text>
						<Text>
							<Color grey>- N -</Color> NEW YORK
						</Text>
						<Text>
							<Color grey>- R -</Color> RESET
						</Text>
					</Box>
				</>
			)}
			{loading && <Text>Updating your location...</Text>}

			{currSelection !== "reset" && (
				<Text>
					Your current destination is <Color pink>{currSelection}</Color>
				</Text>
			)}
			{currSelection === "reset" && (
				<Text>Reset to your current location.</Text>
			)}
			<Box margin={1}>
				<Color>[ Enter ]</Color>
			</Box>
		</Box>
	);
};

module.exports = Travel;
