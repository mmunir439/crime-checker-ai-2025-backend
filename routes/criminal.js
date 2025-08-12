const express = require('express');
const router = express.Router();
const criminalController = require('../controller/criminal');
const { cloudinaryUpload } = require('../utils/cloudinary');
const localUpload = require('../utils/localUpload');

// Custom middleware to run both uploads and keep both file infos
router.post('/addcriminaldata', localUpload.single('photo'), criminalController.createCriminal);
module.exports = router;