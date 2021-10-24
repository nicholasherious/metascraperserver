const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  subject: String,
  body: String,
  seen: Boolean,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const userSchema = new mongoose.Schema({
  username: String,
  email: Boolean,
  type: String
})

var Message = mongoose.model('Message', messageSchema);
var User = mongoose.model('User', userSchema);