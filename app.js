// * IMPORTS
const express = require('express'); 
const app = express(); 
require('dotenv').config();

// * CONFIG
const PORT = 5000; 
const SERVER_URL = `http://localhost:${PORT}`;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const connectToDB = require("./db/mongoose.db");

const start = async () => {
	try {
		await connectToDB(CONNECTION_STRING);
		app.listen(PORT, () => {
			console.log(`Server is running at: ${SERVER_URL}`);
		});
	} catch(e) {
		console.error("There was an error starting the app: ", e.message);
	}
	
}

// * MIDDLEWARE
app.use(express.json());
const authenticationMiddleware = require("./middleware/auth.middleware");

// * ROUTES
app.get('/', (req, res) => {
	res.send('Jobs API');
});

app.use("/api/v1", require("./routes/login.route"));
app.use("/api/v1/jobs", authenticationMiddleware, require("./routes/jobs.route"));

// * LISTEN
start();