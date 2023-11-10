const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const jobRoutes = require("./jobs");

router.use("/users", userRoutes);
router.use("/jobs", jobRoutes);

module.exports = router;
