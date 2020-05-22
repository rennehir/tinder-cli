"use strict";
const importJsx = require("import-jsx");
const React = require("react");
const { Box, Text } = require("ink");
const PropTypes = require("prop-types");

const ImageCarousel = importJsx("./image-carousel");

const Profile = ({ profile }) => {
	return (
		<>
			<Text>{profile.name}</Text>
			<ImageCarousel urls={profile.photos} prevKey="q" nextKey="w" />
		</>
	);
};

Profile.propTypes = {
	profile: PropTypes.object,
};

module.exports = Profile;
