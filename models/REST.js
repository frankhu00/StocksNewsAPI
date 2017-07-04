import * as http from 'http'
import * as https from 'https'
import fetch from 'node-fetch'

import Converter from './Converter.js'

async function getTopStory(callback) {
  let xml = (await get('topstory')).valueOf().data;
  let xmlConverter = new Converter()

  callback(xmlConverter.convertToJson(xml));
}

async function getIndustryNews(tickers, callback) {
  let xml = (await get('industry', ...tickers)).valueOf().data;
  let xmlConverter = new Converter()

  callback(xmlConverter.convertToJson(xml));
}

async function getCompanyNews(tickers, callback) {
  let xml = (await get('headline', ...tickers)).valueOf().data;
  let xmlConverter = new Converter()

  callback(xmlConverter.convertToJson(xml));
}




function get(type, ...tickers) {
  // type = headline , industry , or topstory
  let api = 'http://finance.yahoo.com/rss';

  // API URLs:
  // http://finance.yahoo.com/rss/headline?s=yhoo
  // http://finance.yahoo.com/rss/industry?s=ticker(s)
  // https://finance.yahoo.com/rss/topstory
  let symbols = tickers.join(',')
  let api_endpoint = `${api}/${type}?s=${symbols}`

  const headers = {
    'Content-Type': 'text/xml'
  };

  return fetch(api_endpoint, {headers: headers})
    .then(response => response.text())
    .then(data => ({data: data}) )
    .catch( err => {
      console.log(`Request failed! ${err}`);
    });
}

export default { getTopStory, getIndustryNews, getCompanyNews }
