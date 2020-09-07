const express = require('express');

const Controller = require('./controller');

const routes = express.Router();

routes.post('/scrape', Controller.scrape );


module.exports = routes;