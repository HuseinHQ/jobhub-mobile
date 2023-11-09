const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/users", UserController.getAllUser);
router.post("/users", UserController.postUser);
router.get("/users/:id", UserController.getUserById);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
