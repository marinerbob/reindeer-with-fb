const choicesRouter = require('express').Router();
const foodChoices = require('../data/foodChoices');

choicesRouter.get('/', (req, res) => {
  res.json(foodChoices);
});

module.exports = choicesRouter;