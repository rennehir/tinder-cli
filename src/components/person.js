"use strict";
const importJsx = require("import-jsx");
const React = require("react");
const { Box, Text } = require("ink");
const PropTypes = require("prop-types");

const ImageCarousel = importJsx("./image-carousel");

const Person = ({ profile }) => {
	return (
		<Box flexDirection="column">
			<Text>
				{(profile && profile.name) || "Unknown"},{" "}
				{profile && profile.birth_date
					? calculateAge(profile.birth_date)
					: "NaN"}
			</Text>
			{profile && (
				<ImageCarousel urls={profile.photos} prevKey="q" nextKey="w" />
			)}
			<Box width="100%" textWrap="wrap">
				{profile && <Text>{profile.bio}</Text>}
			</Box>
		</Box>
	);
};

const calculateAge = (birthDate) => {
	return new Date().getFullYear() - new Date(birthDate).getFullYear();
};

Person.propTypes = {
	profile: PropTypes.object,
};

module.exports = Person;
