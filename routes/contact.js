;const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact");

router.post("/", contactController.createContact);
module.exports = router;