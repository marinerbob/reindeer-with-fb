const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('menus are returned as json', async () => {
  await api
    .get('/api/menus')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('there are 8 menu items', async () => {
  const response = await api.get('/api/menus');
  expect(response.body).toHaveLength(8);
});

test('the first menu item is item01', async () => {
  const response = await api.get('/api/menus');
  expect(response.body[0].item).toBe('item01');
});

test('a valid food menu can be added', async () => {
  const menuItem = {
    id: '9',
    item: 'item09',
    ingredient: 'garlic, salad, Chicken, Chilli',
    available: true,
    country: 'Finland',
    discount: 'FI',
    image: './images/2.jpg',
    foodChoices: ['Gluton free'],
  };

  await api
    .post('/api/menus')
    .send(menuItem)
    .expect(200)
    .expect('Content-type', /application\/json/);

  const response = await api.get('/api/menus');
  expect(response.body).toHaveLength(9);
});