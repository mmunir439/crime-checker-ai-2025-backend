const userController=require("../controller/user");
const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    res.send("hello user side");
});
router.post('/registeruser', userController.registeruser);
router.get('/getuser', userController.getuser);
router.post('/loginuser', userController.loginuser);
router.put('/updateuser/:email', userController.updateuser);
router.delete('/deleteuser/:email', userController.deleteuser);
module.exports = router;