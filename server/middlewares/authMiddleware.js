// importing user schema
const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// basically its a middleware that allows me to create protected routes,
// meaning that if user isnt auth - he'll not be able to access endpoint
module.exports.userVerification = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "No token passed",
		});
	}
	jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
		if (err) {
			return res.status(401).json({
				success: false,
				message: "",
				data: {},
				errorMessage: `Failed to authentificate, ${err.message}`,
			});
		} else {
			const user = await User.findById(data.id);
			req.user = {};
			// thats to protected routes should be able to use sensetive data
			req.user.username = user.username;
			req.user.id = user.id;
			next();
		}
	});
};
