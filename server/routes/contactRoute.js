// middleware to create protected routes
const { userVerification } = require("../middlewares/authMiddleware");
// import contact model
const Contact = require("../models/ContactModel");
// expressjs router
const router = require("express").Router();
const mongoose = require("mongoose");

// create contact
router.post("/contact", userVerification, async (req, res) => {
	const { name, phoneNumber, group } = req.body;
	// todo чекать на существование нейма и номера
	// todo делаит проверку на существование дублей номра телефона ??
	// check if name is already taken BUT only for this exact user!
	const existingContact = await Contact.findOne({
		name,
		createdBy: req.user.id,
	});
	if (
		existingContact &&
		req.user.id.toString() === existingContact.createdBy._id.toString()
	) {
		return res.status(409).json({
			success: false,
			message: "",
			data: {},
			errorMessage:
				"Contact with such name already exists, please change the name before savin",
		});
	}

	// create a contact in db
	try {
		const newContact = new Contact({
			name,
			phoneNumber,
			group,
			createdBy: req.user.id,
		});
		const result = await newContact.save();

		return res.status(201).json({
			success: true,
			message: "Successfully created a new contact",
			data: { ...result._doc },
			errorMessage: "",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "",
			data: {},
			errorMessage: `Something went wrong on the server side. Try again later. (${err.message})`,
		});
	}
});

// get all contacts
router.get("/getAllContacts", userVerification, async (req, res) => {
	// populate createdBy field as far as im using ref
	try {
		const myContacts = await Contact.find({ createdBy: req.user.id }).populate(
			"createdBy",
			"-password",
		);

		return res.status(200).json({
			success: true,
			message: "",
			data: { contacts: myContacts.reverse() },
			errorMessage: "",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "",
			data: {},
			errorMessage: `Something went wrong on the server side. Try again later. (${err.message})`,
		});
	}
});

// update contact
router.put("/contact/:id", userVerification, async (req, res) => {
	const { id } = req.params;

	// some validations
	if (!id)
		return res.status(400).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "No id specified",
		});
	if (!mongoose.isValidObjectId(id))
		return res.status(400).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "Please enter a valid id",
		});

	// update a contact
	try {
		const contact = await Contact.findOne({ _id: id });

		// make sure that only right user/ author user can update that contact
		if (req.user.id.toString() !== contact.createdBy._id.toString())
			return res.status(401).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "You can't edit other people contacts!",
			});

		const updatedData = { ...req.body, id: undefined };
		console.log(updatedData);
		const result = await Contact.findByIdAndUpdate(id, updatedData, {
			new: true,
		});

		return res.status(200).json({
			success: true,
			message: "",
			data: { ...result._doc },
			errorMessage: "",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "",
			data: {},
			errorMessage: `Something went wrong on the server side. Try again later. (${err.message})`,
		});
	}
});

// delete a contact
router.delete("/delete/:id", userVerification, async (req, res) => {
	const { id } = req.params;
	// some validations
	if (!id)
		return res.status(400).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "No id specified",
		});
	if (!mongoose.isValidObjectId(id))
		return res.status(400).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "Please enter a valid id",
		});

	try {
		// is it even a contact to delete ??
		const contact = await Contact.findOne({ _id: id });
		if (!contact)
			return res.status(400).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "No contact found",
			});
		// make sure only creator can delete it
		if (req.user.id.toString() !== contact.createdBy._id.toString())
			return res.status(401).json({
				success: false,
				message: "",
				data: {},
				errorMessage: "You can't delete other people contacts!",
			});

		const result = await Contact.deleteOne({ _id: id });
		//todo нам это не нужно, нам нужно просто удалить
		const myContacts = await Contact.find({ createdBy: req.user.id }).populate(
			"createdBy",
			"-password",
		);

		// return updated, reduced list of contacts
		//? таким макаром я обновлю клиент-сайд стор, и заререндерю и тп u know the drill

		return res.status(200).json({
			success: true,
			message: "",
			data: { ...contact._doc, myContacts: myContacts.reverse() },
			errorMessage: "",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "",
			data: {},
			errorMessage: `Something went wrong on the server side. Try again later. (${err.message})`,
		});
	}
});

// get single contact
router.get("/contact/:id", userVerification, async (req, res) => {
	const { id } = req.params;

	// some validations
	if (!id)
		return res.status(400).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "No id specified",
		});
	if (!mongoose.isValidObjectId(id))
		return res.status(400).json({
			success: false,
			message: "",
			data: {},
			errorMessage: "Please enter a valid id",
		});

	try {
		const contact = await Contact.findOne({ _id: id });

		return res.status(200).json({
			success: true,
			message: "",
			data: { ...contact._doc },
			errorMessage: "",
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "",
			data: {},
			errorMessage: `Something went wrong on the server side. Try again later. (${err.message})`,
		});
	}
});

module.exports = router;
