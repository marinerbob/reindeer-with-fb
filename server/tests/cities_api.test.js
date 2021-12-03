const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('cities are returned as json', async () => {
  await api
    .get('/api/cities')
    .expect(200)
    .expect('Content-type', /application\/json/);
});

test('there are 4 cities\' information', async () => {
  const response = await api.get('/api/cities');
  expect(response.body).toHaveLength(4);
});

test('cities - Helsinki, Tampere, Turku, Seninäjoki', async () => {
  const cities = ['helsinki', 'tampere', 'turku', 'seinäjoki'];
  const response = await api.get('/api/cities');
  response.body.map((city, i) => expect(city.city.toUpperCase()).toBe(cities[i].toUpperCase()));
});