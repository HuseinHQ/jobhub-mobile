const express = require("express");
const router = express.Router();
const jobRoutes = require("./job");
const companyRoutes = require("./company");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const publicRoutes = require("./public");

router.post("/login", UserController.login);

// Public routes
router.use("/public", publicRoutes);

// Routes bellow need authentication
router.use(authentication);
router.post("/register", UserController.register);
router.use("/jobs", jobRoutes);
router.use("/companies", companyRoutes);

module.exports = router;
