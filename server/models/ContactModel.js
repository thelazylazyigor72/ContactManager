// to work with mongodb
const mongoose = require("mongoose");

// createdBy field is using ref to acknowledge that we using specific model
const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	phoneNumber: {
		type: String,
		required: [true, "Phone number is required"],
	},
	group: {
		type: String,
		required: false,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
