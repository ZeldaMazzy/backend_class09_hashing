const mongoose = require('mongoose');

const connectToDB = (connectionString) => {
	console.log("Attempting database connection")
	const connection = mongoose.connect(connectionString);

	if(connection) {
		console.log("Successfully connected to Database");
	} else {
		throw new Error("Database Connection Unsuccessful")
	}

	return connection;
};

module.exports = connectToDB;