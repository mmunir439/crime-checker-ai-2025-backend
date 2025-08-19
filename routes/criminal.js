const express = require('express');
const router = express.Router();
const criminalController = require('../controller/criminal');
const { cloudinaryUpload } = require('../utils/cloudinary');
const { requireAuth } = require('../middleware/Auth');
const {isRole} = require('../middleware/isRole');
const localUpload = require('../utils/localUpload');

// Custom middleware to run both uploads and keep both file infos
router.post('/addcriminaldata', requireAuth, isRole, localUpload.single('photo'), criminalController.createCriminal);
router.get('/getCriminalByCNIC', requireAuth, criminalController.getCriminalByCNIC);
router.get('/', criminalController.getallcriminal);
router.post('/verifyCriminalByCNIC', criminalController.verifyCriminalByCNIC);
router.put('/updateCriminal/:cnic', requireAuth, isRole, criminalController.updateCriminal);
router.delete('/deleteCriminalByCNIC/:cnic', requireAuth, isRole, criminalController.deleteCriminalByCNIC);
module.exports = router;