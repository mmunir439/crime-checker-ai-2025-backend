const User=require("../models/user");
const { generateToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/email');
const bcrypt = require('bcrypt');
exports.registeruser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    // Send welcome email
    await sendEmail(
  email,
  "Welcome to Criminal App",
  `
  <div style="max-width:600px;margin:auto;padding:20px;background:#f9f9f9;border-radius:8px;font-family:sans-serif;">
    <h1 style="color:#2d6cdf;text-align:center;">Welcome, ${username}!</h1>
    <p style="font-size:16px;color:#333;">Your registration was successful.</p>
    <p style="font-size:16px;color:#333;">This website will help you find your criminal records.</p>
    <p style="font-size:16px;color:#333;">If you want to know more, visit our website.</p>
    <p style="font-size:16px;color:#333;">
      If you want to contact us, please reach out to our support team or visit 
      <a href="https://munir-portfolio-iota.vercel.app/" style="color:#2d6cdf;">this link</a>.
    </p>
    <p style="font-size:16px;color:#333;">Thank you for joining us!</p>
    <div style="text-align:center;margin-top:30px;">
      <a href="https://munir-portfolio-iota.vercel.app/" style="background:#2d6cdf;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">Visit Our Website</a>
    </div>
  </div>
  `
);

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
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = generateToken({
        userId: user._id,
        email: user.email,
        role: user.role,
        username: user.username
      });
      return res.json({ message: "login successfully", token });
    } else {
      return res.json({ message: "invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};
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