const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

require('dotenv/config');

app.use(cookieParser());


app.use(express.json());
app.use(cors());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());


// Import Routes

const postsRoute = require('./routes/posts');

const authRoute = require('./routes/auth')

// Middleware

app.use('/posts', postsRoute);

app.use('/api/auth', authRoute);

// Start listening to server

//Connect to Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database')
);

app.listen(3001);
