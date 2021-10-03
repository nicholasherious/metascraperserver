const express = require('express')

const router = express.Router()

const scrapeUrl = require('../scraper/scraper')
const GetLinks =  require('../models/GetLinks')

router.get('/', async (req, res) => {
  try {
    const posts = await GetLinks.find()
    res.json(posts)
  } catch (error) {
    res.json({message: error})
  }
});

router.post('/', scrapeUrl, (req, res) => {
    res.send(req.scrapedLink)
})

  module.exports = router