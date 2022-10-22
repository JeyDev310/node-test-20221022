// import request from 'supertest';
import request from 'superagent';

import app from '../src/app';
import sequelize from '../src//constants/db.init';

// let connection, server;
const host = 'localhost:8000'

beforeEach(async () => {
  //db connection
  // const connection = await sequelize.sync();
  // connection

  // server = app.listen(8000);
});

afterEach(() => {
  // server.close();
});

afterAll((done) => {
  done();
})

describe('Endpoints tests', () => {
  it('Get top 20 articles: [/articles]', async() => {
    // const response = await request(app).get('/');
    // expect(response.statusCode).toBe(200);

    const response = await request.get(`${host}/articles`);
    expect(response.statusCode).toBe(200);
    expect(response.body.list).toBe(20);
  });
});

