const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    author: String,
    date: String,
    description: String,
    creator: String,
    name: String,
    userid: String,
    image: String,
    logo: String,
    publisher: String,
    title: String,
    url: String,
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }


)

module.exports = mongoose.model('postmessages', PostSchema)