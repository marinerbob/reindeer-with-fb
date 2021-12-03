const citiesRouter = require('express').Router();
const cities = require('../data/cities.js');

citiesRouter.get('/', (req, res) => {
  res.json(cities);
});

module.exports = citiesRouter;