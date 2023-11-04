// import user model
const User = require("../models/UserModel");
// import funtion to create a token
const { createSecretToken } = require("../utils/genToken");
// import crypto lib
const bcrypt = require("bcryptjs");

// signup controller
module.exports.Signup = async (req, res, next) => {
	try {
		// parse request body
		const { password, username } = req.body;
		// validation, even tho model itself has it
		if (!username || !password) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "All fields are required",
			});
		}
		// try to find this user in db
		const existingUser = await User.findOne({ username });
		// alert if username is already in use
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "User already exist",
			});
		}
		// create user
		const user = await User.create({ password, username });
		// create token for user
		const token = createSecretToken(user._id);
		// sending back cookies w/ token
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		// response onsuccess, notify with message and status code
		res.status(201).json({
			success: true,
			message: "Signed Up Successfully",
			data: { username: user.username, id: user.id },
			errorMessage: "",
		});
		// call next middleware in the stack
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "",
			data: {},
			errorMessage: `Something went wrong on the server side. Try again later. (${error.message})`,
		});
	}
};

// login controller/middleware
module.exports.Login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		// validation
		if (!username || !password) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "All fields are required",
			});
		}
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Invalid password or username",
			});
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.status(409).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "Invalid password or username",
			});
		}
		// create token and send back positive response
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		res.status(201).json({
			success: true,
			message: "Successfully authorized",
			data: { username: user.username, id: user.id },
			errorMessage: "",
		});
		next();
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "",
			data: {},
			errorMessage: `Something went wrong on the server side. Try again later. (${error.message})`,
		});
	}
};
