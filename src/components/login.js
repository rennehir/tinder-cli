"use strict";
const React = require("react");
const { Box, Text } = require("ink");
const { UncontrolledTextInput } = require("ink-text-input");
const jsonfile = require("jsonfile");

const axios = require("../axios");

const file = "/tmp/tcli-data.json";

const { useState } = React;

const Login = ({ loginSuccessful }) => {
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState("");

	const handleSubmitPhone = async (phone) => {
		try {
			await axios.post("/v2/auth/sms/send?auth_type=sms", {
				phone_number: phone,
			});
			setPhone(phone);
		} catch (error) {
			console.log("Error");
		}
	};

	const handleSubmitOTP = async (otp) => {
		try {
			const result = await axios.post("/v2/auth/sms/validate?auth_type=sms", {
				phone_number: phone,
				otp_code: otp,
			});
			const { refresh_token } = result.data.data;

			const loginResult = await axios.post("/v2/auth/login/sms", {
				refresh_token: refresh_token,
			});

			const { api_token } = loginResult.data.data;

			await jsonfile.writeFile(file, { refresh_token, api_token });
			loginSuccessful({ refresh_token, api_token });
		} catch (error) {
			console.log("Error");
		}
	};

	return (
		<Box>
			{!phone && (
				<>
					<Box marginRight={1}>
						<Text>Login by entering your phone number:</Text>
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
