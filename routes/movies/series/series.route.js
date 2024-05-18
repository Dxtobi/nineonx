const express = require('express');
const { get_headers, search_headers, get_full_details, get_by_category, get_download_link } = require('./series.controller.js');
const api_cache = require('apicache')

let cache = api_cache.middleware
const series_router = express.Router();
/**
 * @swagger
 * /api/v1/movies/get-movies/{tag}:
 *   get:
 *     summary: Get a list of movies based on a tag.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         type: string
 *         description: The tag to search for movies.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                 movies:
 *                   type: array
 *                   description: An array of movie objects.
 *                   items:
 *                     type: object
 *                     properties:
 *                       imageUrl:
 *                         type: string
 *                         description: The URL of the movie poster image.
 *                       info_link:
 *                         type: string
 *                         description: The URL of the movie details page.
 *                       title:
 *                         type: string
 *                         description: The title of the movie.
 *                       type:
 *                          type: string
 *                          description: The type of movie either series or movie.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                 message:
 *                   type: string
 *                   description: The original error message.
 *
 *  */
series_router.get('/get-movies/:tag', cache('30 minutes'), get_headers);
/**
 * @swagger
 * /api/v1/movies/category/{category}:
 *   get:
 *     summary: Get a list of movies based on a category.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         type: string
 *         description: The category to search for movies.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                 movies:
 *                   type: array
 *                   description: An array of movie objects.
 *                   items:
 *                     type: object
 *                     properties:
 *                       imageUrl:
 *                         type: string
 *                         description: The URL of the movie poster image.
 *                       info_link:
 *                         type: string
 *                         description: The URL of the movie details page.
 *                       title:
 *                         type: string
 *                         description: The title of the movie.
 *                       type:
 *                          type: string
 *                          description: The type of movie either series or movie.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                 message:
 *                   type: string
 *                   description: The original error message.
 *
 *  */
series_router.get('/category/:category', cache('30 minutes'), get_by_category);
/**
 * @swagger
 *  /api/v1/movies/search:
 *   get:
 *     summary: Search for movies by title.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: query
 *         name: s
 *         required: true
 *         type: string
 *         description: The title of the movie to search for.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                 series:
 *                   type: array
 *                   description: An array of movie objects.
 *                   items:
 *                     type: object
 *                     properties:
 *                       imageUrl:
 *                         type: string
 *                         description: The URL of the movie poster image.
 *                       info_link:
 *                         type: string
 *                         description: The URL of the movie details page.
 *                       title:
 *                         type: string
 *                         description: The title of the movie.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                 message:
 *                   type: string
 *                   description: The original error message.
 */
series_router.get('/search', cache('30 minutes'), search_headers);

/**
 * @swagger
 *  /api/v1/movies/get-details:
 *   get:
 *     summary: Get the full details of a movie.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         type: string
 *         description: The URL of the movie details page.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: string
 *                   description: The movie plot description (if available).
 *                 imageUrl:
 *                   type: string
 *                   description: The URL of the movie poster image (if available).
 *                 info_link:
 *                   type: string
 *                   description: The URL of the movie details page.
 *                 title:
 *                   type: string
 *                   description: The title of the movie.
 *                 youtube:
 *                   type: string
 *                   description: The URL of the YouTube trailer (if available).
 *                 episodes:
 *                   type: array
 *                   description: An array of episode objects (if applicable).
 *                   items:
 *                     type: object
 *                     properties:
 *                       episode:
 *                         type: string
 *                         description: The episode title or number (if available).
 *                       download_link:
 *                         type: string
 *                         description: The URL to download the episode (if available).
 *     500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                 message:
 *                   type: string
 *                   description: The original error message.
 */
series_router.get('/get-details', cache('30 minutes'), get_full_details);

/**
 * @swagger
 *  /api/v1/movies/get-download-link:
 *   get:
 *     summary: Get the downloadable link of a movie.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         type: string
 *         description: The URL of the movie details page.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 download link:
 *                   type: string
 *                   description: The movie plot description (if available).
 *     500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                 message:
 *                   type: string
 *                   description: The original error message.
 */
series_router.get('/get-download-link', get_download_link);

module.exports = series_router;