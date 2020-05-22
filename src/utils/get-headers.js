const jsonfile = require("jsonfile");

const file = "/tmp/tcli-data.json";

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
			console.log("Error");
		});
};

module.exports = getHeaders;
