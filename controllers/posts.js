const mongoose = require('mongoose');
const { update } = require('../models/GetLinks');
const PostMessage = require('../models/GetLinks');

const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '0');
    const PAGE_SIZE = 12;
    const total = await PostMessage.countDocuments({});
    const postMessages = await PostMessage.find()
      .sort({
        createdAt: -1,
      })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.status(200).json({
      page: page + 1,
      total: Math.ceil(total / PAGE_SIZE),
      postMessages,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.scrapedLink;
  const name = req.body.name;
  const userid = req.body.userid;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    name: name,
    userid: userid,
  });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that ID');

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Link deleted successfully' });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No Post with that Id');

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex(id => id === String(req.userId));

  if (index === -1) {
    // like the post

    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter(id => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

const fetchPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.skip);

    const tradesCollection = await PostMessage.find().skip(offset).limit(limit);
    const tradesCollectionCount = await PostMessage.count();

    const totalPages = Math.ceil(tradesCollectionCount / limit);
    const currentPage = Math.ceil(tradesCollectionCount % offset);

    res.status(200).send({
      data: tradesCollection,
      paging: {
        total: tradesCollectionCount,
        page: currentPage,
        pages: totalPages,
      },
    });
  } catch (e) {
    console.log('Error', e);
    res.status(500).send({
      data: null,
    });
  }
};
module.exports = {
  createPost,
  getPosts,
  deletePost,
  likePost,
  fetchPosts,
};
