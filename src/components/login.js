"use strict";
const React = require("react");
const { Box, Text, Color, useInput } = require("ink");
const { UncontrolledTextInput } = require("ink-text-input");

const { useState } = React;

const Login = ({ setLoggedIn, name }) => {
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState("");

	const handleSubmitPhone = phone => {
		setPhone(phone);
	};

	const handleSubmitOTP = otp => {
		setOtp(otp);
		setTimeout(() => {
			setLoggedIn(true);
		}, 1000);
	};

	return (
		<Box>
			{!phone && (
				<>
					<Box marginRight={1}>
						<Text>
							Hello, <Color green>{name}</Color>! Login by entering your phone
							number:
						</Text>
					</Box>
					<UncontrolledTextInput onSubmit={handleSubmitPhone} />
				</>
			)}
			{phone && !otp && (
				<>
					<Box marginRight={1}>
						<Text>Enter one-time password:</Text>
					</Box>
					<UncontrolledTextInput onSubmit={handleSubmitOTP} />
				</>
			)}
			{phone && otp && (
				<Box flexDirection="column">
					<Text>Phone: {phone}</Text>
					<Text>OTP: {otp}</Text>
				</Box>
			)}
		</Box>
	);
};

module.exports = Login;
