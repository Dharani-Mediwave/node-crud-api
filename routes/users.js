const express = require("express");
const registerController = require("../controller/register");

const router = express.Router();

router.post("/register", registerController.register); //POST request to register the user

module.exports = router;
