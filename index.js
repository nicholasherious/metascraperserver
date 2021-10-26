const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo');
require('dotenv/config');

// app.use(cookieParser());

//Connect to Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database')
);


app.use(express.json());
app.use(cors({origin:true, credentials: true}));

app.use(session({
  secret: 'anything',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION }),
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
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



app.listen(3001);
