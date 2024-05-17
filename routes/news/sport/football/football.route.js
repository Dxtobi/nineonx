const express = require('express');
const { get_headers } = require('./football.controller.js');

const football_router = express.Router();

football_router.get('/', get_headers);

module.exports = football_router;
