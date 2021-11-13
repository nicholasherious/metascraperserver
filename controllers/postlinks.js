const GetLinks = require('../models/GetLinks');
const cloudinary = require('../utils/cloudinary');

// Get all posts and paginate

const getAllPosts = async (req, res) => {
  const { page = 1, limit = 15 } = req.query;

  try {
    const posts = await GetLinks.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: '-1' })
      .exec();

    // get total documents in the Posts collection
    const count = await GetLinks.countDocuments();

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Get single post

const getSinglePost = async (req, res) => {
  try {
    const post = await GetLinks.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Post A Link

const postLink = async (req, res) => {
  const scraped = req.scrapedLink;

  try {
    res.send(scraped);
  } catch (error) {
    res.json({ message: error });
  }
};

// Post Image

const postSingleImage = async (req, res) => {
  try {
    console.log(req.body);
    const result = await cloudinary.uploader.upload(req.file.path);
    const description = req.body.title;
    const userEmailData = req.body.userData;
    const userName = req.body.username;
    console.log(description);
    const uploadedImage = new GetLinks({
      image: result.secure_url,
      desc: description,
      userData: userEmailData,
      name: userName,
    });
    const newImage = await uploadedImage.save();
    res.json(newImage);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllPosts, postLink, getSinglePost, postSingleImage };
