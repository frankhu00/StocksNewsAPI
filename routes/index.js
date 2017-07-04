var express = require('express');
var router = express.Router();
import REST from '../models/REST.js'
import Converter from '../models/Converter.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* News API */
router.get('/news', function(req, res, next) {

  let tickers = ['tsla', 'yhoo', 'ibm', 'msft']

  REST.getTopStory( json => {
    populate(json);
  });

  REST.getCompanyNews(tickers, (json) => {
    populate(json);
  });

  REST.getIndustryNews(tickers, (json) => {
    populate(json);
  });

  res.render('index', { title: 'News'});
});

function populate(json) {
  if(json.hasOwnProperty('channel') ) {
    console.log(`API source: ${json.channel.link}, yielded ${json.channel.item.length} results`);
    console.log('Sample item result :', json.channel.item[0]);
  } else {
    console.log(json);
  }

}


module.exports = router;
