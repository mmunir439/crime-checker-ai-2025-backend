const Contact = require("../models/contact");

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new contact entry
    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();

    res.status(201).json({ message: "Contact message submitted successfully", savedContact });
  } catch (error) {
    console.error("Error creating contact message:", error);
    next(error);
  }
};