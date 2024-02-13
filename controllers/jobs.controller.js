const getAllJobs = async (req, res) => {
	try {
		res.status(200).send("Here are some jobs");
	} catch(e) { 
		res.status(400).send(e.message);
	}
}

const getJob = async (req, res) => {
	try {
		res.status(200).send("A single job");
	} catch(e) {
		res.status(400).send(e.message);
	}
}

const updateJob = async (req, res) => {
	try {
		res.status(201).send("Successfully updated");
	} catch(e) {
		res.status(400).send(e.message);
	}
}

const createJob = async (req, res) => {
	try {
		res.status(201).send("Successfully Created");
	} catch(e) {
		res.status(400).send(e.message);
	}
}

const deleteJob = async (req, res) => {
	try {
		res.status(204).send();
	} catch(e) {
		res.status(400).send(e.message);
	}
}

module.exports = {
	getAllJobs,
	getJob,
	updateJob,
	createJob,
	deleteJob
}