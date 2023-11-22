const express = require("express");
const registerController = require("../controller/register");
const { login } = require("../controller/login");

const router = express.Router();

router.post("/register", registerController.register); //POST request to register the user
router.post("/login", login);

module.exports = router;
