const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('Train models are returned as json', async () => {
  await api.get('/api/trainmodels')
    .expect(200)
    .expect('Content-type', /application\/json/);
});