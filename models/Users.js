const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema =  new mongoose.Schema({
    username: { type: String, required: true},
    password: String,
    email: { type: String }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', userSchema);