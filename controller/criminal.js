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
exports.updateCriminal = async (req, res, next) => {
  try {
    const { name, crimeType, age } = req.body;
    const cnic = req.params.cnic;

    if (!cnic) {
      return res.status(400).json({ error: "CNIC is required to update a criminal" });
    }

    const updatedCriminal = await Criminal.findOneAndUpdate(
      { cnic },
      { name, crimeType, age },
      { new: true }
    );

    if (!updatedCriminal) {
      return res.status(404).json({ error: "Criminal not found" });
    }

    res.status(200).json({ message: "Criminal updated successfully", updatedCriminal });
  } catch (error) {
    console.error("Error updating criminal:", error);
    next(error);
  }
};
exports.deleteCriminalByCNIC=async (req,res,next)=>{
  try{
    const getcriminial= await Criminal.findOneAndDelete({ cnic: req.params.cnic });
    if(!getcriminial){
      return res.status(404).json({ error: "Criminal not found" });
    }
    else{
return res.status(200).json({ message: "Criminal Deleted Successfully" });
    }
  }
  catch(error){
    console.error("Error deleting criminal:", error);
    next(error);
  }
}
exports.getCriminalByCNIC = async (req, res, next) => {
  try {
    const cnic = req.user.cnic; // Extract cnic from token
    if (!cnic) {
      return res.status(400).json({ error: "CNIC is missing in the token" });
    }
    const criminal = await Criminal.findOne({ cnic });
    if (!criminal) {
      return res.status(404).json({ error: "Criminal not found" });
    }
    res.status(200).json(criminal);
  } catch (error) {
    console.error("Error fetching criminal:", error);
    next(error);
  }
};
exports.getallcriminal = async (req, res, next) => {
  try {
    const criminals = await Criminal.find();
    if (!criminals.length) {
      return res.status(404).json({ error: "No criminals found" });
    }
    res.status(200).json(criminals);
  } catch (error) {
    console.error("Error fetching criminals:", error);
    next(error);
  }
}
