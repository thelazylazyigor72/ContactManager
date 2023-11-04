// import our express module
const express = require("express");
// import mongoose to work with mongodb
const mongoose = require("mongoose");
// to use env variables
require("dotenv").config({ path: ".././.env" });
// import our instance of a connection to mongodb
const dbConnection = require("./db/db");
// importing CORS module to use cors middleware (note: im not really sure that its required for my project in general but i decided to add it)
const cors = require("cors");
// to work with cookies, extract data from it or manage cookie based sessions
const cookieParser = require("cookie-parser");
// auth router
const authRouter = require("./routes/authRoute");
// contact router
const contactRouter = require("./routes/contactRoute");

//!end of import section -----------------------------------------------------------------------------------------------------------

// port, either 8082 or something dat we can define ourself
const port = process.env.PORT || 8082;

// create an instance of express to work with
const app = express();

// call an instance of connection to mongodb to initialize connection
dbConnection();

//! Middlewares - functions that executes between http actions -------------------------------------------------------------------------

// CORS middleware, i dont think its required in my app, but just in case, and just to try it out
// * not allowing requests from other domains, no specified server response header written
// !!! Игорь, смотри я для тестов вручную добавил фронтовский локалхост, по идее все должно быть по другому !!
app.use(
	cors({
		origin: [`http://localhost:${port}`, "http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

// to use *body* property within req object
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// note, im useing it w/ /api, since i wanna use static files and be client and server on the same domain
// defining auth router
app.use("/api", authRouter);

// defining contact router
app.use("/api", contactRouter);

//! end of middleware section -----------------------------------------------------------------------------------------------------------

// initialize server
app.listen(port, () => console.log(`Server is working, port: ${port}`));
