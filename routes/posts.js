const express = require('express');

const router = express.Router();

const scrapeUrl = require('../scraper/scraper');
const GetLinks = require('../models/GetLinks');

const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

const {
  getPosts,
  createPost,
  deletePost,
  likePost,
  fetchPosts,
  findAll,
} = require('../controllers/posts');

// Paginate Options

// const options = {
//   sort: { createdAt: -1 },
// };

router.get('/', async (req, res) => {
  const { limit, page } = req.query;
  const getPosts = await GetLinks.paginate({}, { limit, page });
  res.json(getPosts);
});

// Post Links from React
router.post('/', scrapeUrl, async (req, res) => {
  const scraped = req.scrapedLink;
  const description = req.body.desc;
  const username = req.body.name;
  const image = req.body.image;
  const post = new GetLinks({
    ...scraped,
    desc: description,
    name: username,
    authorImg: image,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// Get single post
router.get('/:postId', async (req, res) => {
  const post = await GetLinks.findById(req.params.postId);
  res.json(post);
});

// Post single images.

router.post('/image/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const description = req.body.title;
    console.log(description);
    const uploadedImage = new GetLinks({
      image: result.secure_url,
      desc: description,
    });
    const newImage = await uploadedImage.save();
    res.json(newImage);
  } catch (error) {
    console.log(error);
  }
});

//Like Post

router.patch('/:id/likepost', likePost);

module.exports = router;
