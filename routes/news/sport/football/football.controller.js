const asyncHandler = require('express-async-handler');
const cheerio = require('cheerio');
const axios = require('axios');


 exports.get_headers= asyncHandler(async (req, res, next) => {
    try {
      const sky = await skySport();
      const bbc = await big_black_c();
      const sun = await the_sun();
      return res.json({ message: 'working on this route', data: { sky, bbc, sun } });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'something went wrong...', message: error.message });
    }
  })


const skySport = async () => {
  let data = {};

  const axiosResponse = await axios.request({
    method: 'GET',
    url: 'https://www.skysports.com/football/news',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });
  const $ = cheerio.load(axiosResponse.data);

  $('.sdc-site-tile--exclusive').each((index, element) => {
    const title = $(element).find('.sdc-site-tile__headline-text').text().trim();
    const info_link = 'https://www.skysports.com' + $(element).find('.sdc-site-tile__headline a').attr('href');
    const imageUrl = $(element).find('img').attr('src');
    data = { imageUrl, info_link, title, from: 'SkySport', subtitle: 'N/A' };
  });
  return data;
};

const big_black_c = async () => {
  let data = {};

  const axiosResponse = await axios.request({
    method: 'GET',
    url: 'https://www.bbc.com/sport/football/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });
  const $ = cheerio.load(axiosResponse.data);

  $('.ssrcss-5ahces-Grid').each((index, element) => {
    const title = $(element).find('.ssrcss-1nzemmm-PromoHeadline span').text().trim();
    const subtitle = $(element).find('.ssrcss-1q0x1qg-Paragraph').text().trim();
    const info_link = 'https://www.bbc.com' + $(element).find('.ssrcss-1f3bvyz-Stack a').attr('href');
    const imageUrl = $(element).find('picture img').attr('src');
    data = { imageUrl, info_link, title, from: 'BBCsport', subtitle };
  });
  return data;
};

const the_sun = async () => {
  let data = {};

  const axiosResponse = await axios.request({
    method: 'GET',
    url: 'https://www.bbc.com/sport/football/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });
  const $ = cheerio.load(axiosResponse.data);

  $('.sun-col-4 .teaser-item').each((index, element) => {
    const title = $(element).find('.teaser__copy-container a .teaser__headline span').text().trim() + $(element).find('.teaser__copy-container a .teaser__headline h3').text().trim();
    const subtitle = $(element).find('.ssrcss-1q0x1qg-Paragraph').text().trim();
    const info_link = 'https://www.bbc.com' + $(element).find('.teaser__copy-container a').attr('href');
    const imageUrl = $(element).find('picture img').attr('src');
    data = { imageUrl, info_link, title, from: 'The Sun', subtitle };
  });
  return data;
};
