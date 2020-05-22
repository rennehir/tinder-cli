const axios = require("axios");

const instance = axios.create({
	baseURL: "https://api.gotinder.com",
});

module.exports = instance;
