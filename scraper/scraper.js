const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
]);

const got = require('got');

const scrapeUrl = async (req, res, next) => {
  const link = req.body.link;

  try {
    const { body: html, url } = await got(link);
    const metadata = await metascraper({ html, url });
    console.log(metadata);
    req.scrapedLink = metadata;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

module.exports = scrapeUrl;
