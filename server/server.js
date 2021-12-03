const express = require('express');
const app = express();

app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log(`Body: ${req.body}`);
  console.log('--- ***** ---');
  next();
};

app.use(requestLogger);
const PORT = process.env.PORT || 8000;

let foodData = [
  {
    id: '1',
    item: 'item01',
    ingredient: 'potatos,cocumber',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: 'Pic1',
    foodChoices: ['Non-Veg'],
  },
  {
    id: '2',
    item: 'item02',
    ingredient: 'garlic,Lamb,salad',

    available: true,
    country: 'Finland',
    discount: 'FI',
    image: 'Pic2',

    foodChoices: ['Non-Veg'],
  },
  {
    id: '3',
    item: 'item03',
    ingredient: 'garlic, salad, Chilli ',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: 'Pic3',
    foodChoices: ['Veg'],
  },
  {
    id: '4',
    item: 'item04',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: 'Pic4',
    foodChoices: ['Lacto Veg'],
  },
  {
    id: '5',
    item: 'item05',
    ingredient: 'garlic, salad, Chicken,Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: 'Pic5',
    foodChoices: ['Non-Veg'],
  },
  {
    id: '6',
    item: 'item06',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: 'Pic6',
    foodChoices: ['Lactose Free'],
  },
  {
    id: '7',
    item: 'item07',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: '',
    foodChoices: ['Gluton free'],
  },
  {
    id: '8',
    item: 'item08',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: '',
    foodChoices: ['Gluton free'],
  }
];

const getWelcomeMessage = (req, res) => {
  res.send('<em>Reindeer food service for train passengers</em>');
};

const getAllMenus = (req, res) => {
  res.json(foodData);
};

const postDepartureInfo = (req, res) => {
  const departureInfo = req.body;
  res.send(departureInfo);
};

// GET
app.get('/', getWelcomeMessage);

app.get('/api/menus', getAllMenus);

app.get('/api/menus/:id', (req, res) => {
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
app.post('/api/menus', (req, res) => {
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
app.post('/api/departure', postDepartureInfo);

// DELETE
app.delete('/api/menus/:id', (req, res) => {
  const id = Number(req.params.id);
  foodData = foodData.filter(food => Number(food.id) !== id);
  res.status(202).end();
});

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({
    error: 'unknown endpoint'
  });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});