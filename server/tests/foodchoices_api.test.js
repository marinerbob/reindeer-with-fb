const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('food choices are returned as json', async () => {
  await api
    .get('/api/foodchoices')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('there are 5 food choices', async () => {
  const response = await api.get('/api/foodchoices');
  expect(response.body).toHaveLength(5);
});

test('first food choice label is Gluton free', async () => {
  const response = await api.get('/api/foodchoices');
  expect(response.body[0].label).toBe('Gluton free');
});