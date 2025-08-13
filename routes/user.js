const userController=require("../controller/user");
const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    res.send("hello user side");
});
router.post('/adduser', userController.createUser);
router.get('/getuser', userController.getuser);
module.exports = router;