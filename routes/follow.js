const express = require('express');
const router = express.Router();
const { followUser } = require('../controllers/follow');

router.put('/:id/follow', followUser);

module.exports = router;
