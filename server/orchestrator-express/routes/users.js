const express = require("express");
const UserController = require("../controllers/users/UserController");
const router = express.Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.get("/:id", UserController.getUserById);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
