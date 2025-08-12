require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./utils/cloudinary');
const connectDB = require('./utils/db');
const criminalRoutes = require('./routes/criminal');
const app = express();
const port = process.env.PORT || 3000;
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Multer Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage: storage });
app.use('/criminals', criminalRoutes);
app.get('/iftikhar', (req, res) => {
  res.send('I am working web developerment');
});
// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});