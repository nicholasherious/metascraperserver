const express = require('express')

const router = express.Router()

const scrapeUrl = require('../scraper/scraper')
const GetLinks =  require('../models/GetLinks')

router.get('/', async (req, res) => {
  try {
    const posts = await GetLinks.find().sort({_id:-1})
    res.json(posts)
  } catch (error) {
    res.json({message: error})
  }
});

router.post('/', scrapeUrl, async (req, res) => {
  const scraped = req.scrapedLink
  const description = req.body.desc
  const post = new GetLinks({...scraped, desc: description})

    try {
      const savedPost = await post.save()
      res.json(savedPost)
    } catch (error) {
      res.json({ message: error})
    }
})

router.get('/:postId', async (req, res) => {
  const post = await GetLinks.findById(req.params.postId)
  res.json(post)
})

  module.exports = router