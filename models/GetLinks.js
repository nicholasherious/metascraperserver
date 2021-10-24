const mongoose = require('mongoose');

const userData = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

module.exports = mongoose.model('User', userData);

const PostSchema = mongoose.Schema(
  {
    author: String,
    date: String,
    description: String,
    creator: String,
    name: String,
    userid: String,
    user: { type: mongoose.Types.ObjectId, ref: 'users'},

    userData: String,
    image: String,
    logo: String,
    publisher: String,
    title: String,
    url: String,
    desc: String,
    imageUrl: String,
    authorImg: String,
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('postmessages', PostSchema);
