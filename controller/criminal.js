const cloudinary = require('../utils/cloudinary').cloudinary;
const fs = require('fs');
const Criminal = require('../models/criminal'); // Make sure you import your model
exports.createCriminal = async (req, res) => {
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
    if (error.code === 11000 && error.keyPattern && error.keyPattern.cnic) {
      // Duplicate CNIC error
      return res.status(400).json({ error: "This CNIC is already registered." });
    }
    res.status(400).json({ error: error.message });
  }
};