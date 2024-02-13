const express = require("express");
const router = express.Router();

const { 
	getAllJobs,
	getJob,
	updateJob,
	createJob,
	deleteJob 
} = require("../controllers/jobs.controller");

router.route("/").get(getAllJobs);
router.route("/:id").get(getJob);
router.route("/:id").put(updateJob);
router.route("/").post(createJob);
router.route("/:id").delete(deleteJob);

module.exports = router;