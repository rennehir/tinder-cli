const path = require("path");
const jsonfile = require("jsonfile");

const file = path.join("/tmp", "tcli-data.json"); // "/tmp/tcli-data.json";

const getHeaders = () => {
	return jsonfile
		.readFile(file, { throws: false })
		.then((tokens) => {
			return {
				"X-Auth-Token": tokens.api_token,
				"Content-Type": "application/json",
				"User-Agent": "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)",
			};
		})
		.catch((e) => {
			console.log("Not logged in");
		});
};

module.exports = getHeaders;
