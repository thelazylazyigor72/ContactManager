require("dotenv").config();
// to use jwt itself
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

// here im creating jwt token based on id, with specified secret string, third parameter is expire date.
module.exports.createSecretToken = (id) => {
	return jwt.sign({ id }, TOKEN_KEY, {
		expiresIn: 3 * 24 * 60 * 60,
	});
};
