// importing signup/login middlewares
const { Signup, Login } = require("../controllers/authController");
// middleware to create protected routes
const { userVerification } = require("../middlewares/authMiddleware");
// expressjs router
const router = require("express").Router();

// signup
router.post("/signup", Signup);
// login
router.post("/login", Login);
// auth tester
// to initialy verify authentification
router.get("/verify", userVerification, async (req, res) => {
	return res.status(200).json({
		success: true,
		message: "",
		data: { username: req.user.username, id: req.user.id },
		errorMessage: "",
	});
});

module.exports = router;
