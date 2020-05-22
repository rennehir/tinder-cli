"use strict";
const React = require("react");
const PropTypes = require("prop-types");
const importJsx = require("import-jsx");
const { Text, Color } = require("ink");

const Login = importJsx("./src/components/login");

const { useState } = React;

const App = ({ name }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return isLoggedIn ? (
		<Text>
			Hello, <Color green>{name}</Color>
		</Text>
	) : (
		<Login name={name} setLoggedIn={setIsLoggedIn} />
	);
};

App.propTypes = {
	name: PropTypes.string
};

App.defaultProps = {
	name: "Pussy"
};

module.exports = App;
