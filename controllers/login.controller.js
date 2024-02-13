const jwt = require("jsonwebtoken");
const User = require("../db/models/user.model");

const register = async (req, res) => {
	try {
		const newUser = await User.create({ ...req.body });
		const token = newUser.createToken();

		res.status(201).json({ user: newUser.name, token: token });;
	} catch(e) {
		console.error("Error registering: ", e.message);
		res.status(400).send("Something happened while trying to register you: " + e.message);
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if(!email || !password) {
			const err = new Error("Email and Password are required");
			err.code = "400";
			throw err;
		}

		const user = await User.findOne({ email: email });

		if(!user) {
			const err = new Error("Invalid Email or Password");
			err.code = "401";
			throw err;
		}

		const passwordCorrect = await user.comparePassword(password);

		if(passwordCorrect == false) {
			const err = new Error("Invalid Email or Password");
			err.code = "401";
			throw err;
		}

		const token = user.createToken();

		res.status(200).json({
			msg: "logged in",
			token
		});
	} catch(e) {
		let code = 400;
		if(e.code) code = +e.code
		res.status(code).send(e.message);
	}
	
}

module.exports = {
	register,
	login
}