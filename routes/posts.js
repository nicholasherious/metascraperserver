const express = require('express')

const router = express.Router()

const scrapeUrl = require('../scraper/scraper')

router.get('/', scrapeUrl);

router.post('/', scrapeUrl, (req, res) => {
    res.send(req.scrapedLink)
})

  module.exports = router