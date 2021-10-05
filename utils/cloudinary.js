const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: 'WSAXXBs3EA-58jp7TA1Ws0hVYio',
});

module.exports = cloudinary;
