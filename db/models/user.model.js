const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name must be provided"],
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be valid'],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: 6
	}
});

userSchema.pre("save", async function() {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createToken = function() {
	return jwt.sign(
		{
			userId: this._id,
			name: this.name
		},
		process.env.SECRET_KEY,
		{
			expiresIn: '30d'
		}
	);
};

userSchema.methods.comparePassword = async function(incomingPassword) {
	const isMatch = await bcrypt.compare(incomingPassword, this.password);
	return isMatch;
}

module.exports = mongoose.model("User", userSchema);