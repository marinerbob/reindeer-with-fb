const modelsRouter = require('express').Router();
const trainModels = require('../data/trainModels');

// GET all models
modelsRouter.get('/', (req, res) => {
  res.json(trainModels);
});

module.exports = modelsRouter;