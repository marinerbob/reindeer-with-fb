const menuRouter = require('express').Router();
let foodData = require('../data/foodData.js');

/* const getWelcomeMessage = (req, res) => {
  res.send('<em>Reindeer food service for train passengers</em>');
}; */

const getAllMenus = (req, res) => {
  res.json(foodData);
};

// const postDepartureInfo = (req, res) => {
//   const departureInfo = req.body;
//   res.send(departureInfo);
// };

// GET
// menuRouter.get('/', getWelcomeMessage);

menuRouter.get('/', getAllMenus);

menuRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const menu = foodData.find(food => Number(food.id) === id);
  if (menu) {
    res.json(menu);
  }
  else {
    res.statusMessage = `Id - ${id} does not exist`;
    res.status(404).end();
  }
});

// POST
const generateId = () => {
  const maxId = foodData.length > 0
    ? Math.max(...foodData.map(food => Number(food.id)))
    : 0;
  return maxId + 1;
};
menuRouter.post('/', (req, res) => {
  const body = req.body;
  if (!body.item) {
    return res.status(400).json({
      error: 'Item name missing'
    });
  }

  const menu = {
    id: String(generateId()),
    item: body.item,
  };
  foodData = foodData.concat(menu);
  console.log(menu);
  res.json(menu);
});
// menuRouter.post('/api/departure', postDepartureInfo);

// DELETE
menuRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  foodData = foodData.filter(food => Number(food.id) !== id);
  res.status(202).end();
});

module.exports = menuRouter;
