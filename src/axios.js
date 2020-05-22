const axios = require("axios");

const instance = axios.create({
	baseURL: "https://api.gotinder.com",
	headers: {
		"Content-Type": "application/json",
		"User-Agent": "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)",
	},
});

module.exports = instance;
