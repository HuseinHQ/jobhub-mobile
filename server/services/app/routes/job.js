const express = require("express");
const JobController = require("../controllers/JobController");
const router = express.Router();

router.get("/", JobController.getAllJobs);
router.post("/", JobController.postJobs);
router.get("/:jobId", JobController.getJobById);
router.put("/:jobId", JobController.putJobs);
router.delete("/:jobId", JobController.deleteJobs);

module.exports = router;
