const User=require("../models/user");
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get all user
exports.getuser = async (req, res) => {
  try {
    const seeuserdetails = await User.find();
    res.status(200).json(seeuserdetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};