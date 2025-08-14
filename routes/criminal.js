const express = require('express');
const router = express.Router();
const criminalController = require('../controller/criminal');
const { cloudinaryUpload } = require('../utils/cloudinary');
const { requireAuth } = require('../middleware/Auth');
const localUpload = require('../utils/localUpload');

// Custom middleware to run both uploads and keep both file infos
router.post('/addcriminaldata', localUpload.single('photo'), criminalController.createCriminal);
router.get('/getbycnic/:cnic', requireAuth, criminalController.getCriminalByCNIC);
router.put('/updateCriminal/:cnic', criminalController.updateCriminal);
router.delete('/deleteCriminalByCNIC/:cnic', criminalController.deleteCriminalByCNIC);
module.exports = router;