const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = {
  limit: 20,
  sort: { createdAt: -1 },
};

const PostSchema = mongoose.Schema(
  {
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

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('postmessages', PostSchema);
