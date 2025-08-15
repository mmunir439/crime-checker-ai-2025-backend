require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./utils/cloudinary');
const connectDB = require('./utils/db');
const criminalRoutes = require('./routes/criminal');
const userRoutes = require('./routes/user');
const {role,computer,math,handleerror}=require("./middleware/practiceme");
const { requireAuth } = require('./middleware/Auth');
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
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage: storage });
app.use('/criminals', criminalRoutes);
app.use('/user', userRoutes);
app.use(role);// this is the global middle ware that applies to all incoming requests
app.get('/',computer,math,requireAuth,(req, res) => {// route specifce middle ware
  res.send('I am working web developerment');
});
app.use(handleerror);
// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});