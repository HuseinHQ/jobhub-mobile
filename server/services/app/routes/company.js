const express = require("express");
const CompanyController = require("../controllers/CompanyController");
const router = express.Router();

router.get("/", CompanyController.getAllCompanies);
router.post("/", CompanyController.postCompanies);
router.get("/:companyId", CompanyController.getCompanyById);
router.put("/:companyId", CompanyController.putCompanies);
router.delete("/:companyId", CompanyController.deleteCompanies);

module.exports = router;
