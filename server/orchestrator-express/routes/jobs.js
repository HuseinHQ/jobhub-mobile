const express = require("express");
const router = express.Router();
const JobController = require("../controllers/app/JobController");

router.get("/", JobController.getAllJobs);
router.post("/", JobController.createJob);
router.get("/:id", JobController.getJobById);
router.put("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

module.exports = router;
