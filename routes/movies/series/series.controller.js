const asyncHandler = require('express-async-handler');
const { getMovies, searchMovies, getDetails, getByCategory, getDownloadLink } = require('../../../utils/scrappers/series');


exports.get_headers = asyncHandler(async (req, res, next) => {
  try {
    const series = await getMovies(req.params.tag);
    return res.status(200).json({ message: 'working on this route', series });
  } catch (error) {
    console.log('10',error.message);
    return res.status(500).json({ error: 'something went wrong...', message: error.message });
  }
});


exports.get_by_category = asyncHandler(async (req, res, next) => {
  try {
    const series = await getByCategory(req.params.category);
    return res.status(200).json({ message: 'working on this route', series });
  } catch (error) {
   // console.log(error.message);
    return res.json({ error: 'something went wrong...', message: error.message });
  }
});

exports.search_headers = asyncHandler(async (req, res, next) => {
  try {
    const series = await searchMovies(req.query.s);
    return res.status(200).json({ message: 'working on this route', series });
  } catch (error) {
    //console.log(error.message);
    return res.json({ error: 'something went wrong...', message: error.message });
  }
});


exports.get_full_details = asyncHandler(async (req, res, next) => {
  try {
    const details = await getDetails(req.query.url);
    return res.status(200).json({ details });
  } catch (error) {
    //console.log(error.message);
    return res.json({ error: 'something went wrong...', message: error.message });
  }
});

exports.get_download_link = asyncHandler(async (req, res, next) => {
  try {
    const url = await getDownloadLink(req.query.url);
    return res.status(200).json({ url });
  } catch (error) {
    //console.log(error.message);
    return res.json({ error: 'something went wrong...', message: error.message });
  }
});

