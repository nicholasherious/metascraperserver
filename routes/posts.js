const express = require('express');

const router = express.Router();

const scrapeUrl = require('../scraper/scraper');
const GetLinks = require('../models/GetLinks');

const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

const { getAllPosts, postLink, getSinglePost, postSingleImage } = require('../controllers/postlinks')

// Get all posts

router.get('/', getAllPosts) 

// Post Links from React
router.post('/', scrapeUrl, postLink) 

// Get single post
router.get('/:postId', getSinglePost);

// Post single images.

router.post('/image/upload', upload.single('image'), postSingleImage);



module.exports = router;
