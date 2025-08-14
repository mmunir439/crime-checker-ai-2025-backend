const User=require("../models/user");
const { generateToken } = require('../utils/jwt');
exports.registeruser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.loginuser = async (req, res, next) => { 
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "please go and register because you don't have account" });
    }
    if (password == user.password) {
      console.log('JWT_SECRET:', process.env.JWT_SECRET);
  const token = generateToken({ userId: user._id, email: user.email });
  return res.json({ message: "login successfully", token });
} else {
      return res.json({ message: "invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};// get all user
exports.getuser = async (req, res) => {
  try {
    const seeuserdetails = await User.find();
    res.status(200).json(seeuserdetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateuser=async (req,res,next)=>{
  try{
    const { username, email, password } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      { username, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    else{
      return res.status(200).json({ message: "User updated successfully" });
    }
    res.status(200).json(updatedUser);
  }
  catch(error){
    next(error);
  }
}
exports.deleteuser=async (req,res,next)=>{
  try{
    const deletedUser = await User.findOneAndDelete({ email: req.params.email });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch(error){
    next(error);
  }
}