const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());
app.use(cors());

// Import Routes

const postsRoute = require('./routes/posts');

// Middleware

app.use('/posts', postsRoute);

// Start listening to server

//Connect to Database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database')
);

app.listen(3001);
