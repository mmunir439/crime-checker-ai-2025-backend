const cloudinary = require('../utils/cloudinary').cloudinary;
const fs = require('fs');
const fetch = require('node-fetch');
const Criminal = require('../models/criminal'); // Make sure you import your model
exports.createCriminal = async (req, res,next) => {
  try {
    const { name, cnic, crimeType, age } = req.body;
    const localPhotoPath = req.file.path;

    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(localPhotoPath, {
      folder: 'uploads'
    });

    // Save both URLs if you want
    const newCriminal = new Criminal({
      name,
      cnic,
      crimeType,
      age,
      photo: cloudinaryResult.secure_url,
      localPhoto: localPhotoPath
    });
    const savedCriminal = await newCriminal.save();

    res.status(201).json(savedCriminal);
  } catch (error) {
    next(error);
  }
};
exports.getCriminalByCNIC = async (req, res,next) => {
  try{
     const criminal = await Criminal.findOne({ cnic: req.params.cnic });
if (!criminal) {
  return res.status(404).json({ error: "Criminal not found" });
}
res.status(200).json(criminal);
  }
  catch(error){
    console.error("Error fetching criminal:", error);
    next(error);
  }
};
