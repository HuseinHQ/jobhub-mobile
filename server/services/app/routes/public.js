const express = require("express");
const JobController = require("../controllers/JobController");
const CompanyController = require("../controllers/CompanyController");
const router = express.Router();

router.get("/jobs", JobController.getAllJobs);
router.get("/jobs/:jobId", JobController.getJobById);
router.get("/companies", CompanyController.getAllCompanies);

module.exports = router;
