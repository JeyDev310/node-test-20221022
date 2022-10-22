// import request from 'supertest';
import request from 'superagent';

const host = 'localhost:8000';

afterAll((done) => {
  done();
});

describe('Endpoints tests', () => {
  it('Get top 20 articles: [/articles]', async() => {
    const response = await request.get(`${host}/articles`);
    expect(response.statusCode).toBe(200);
    expect(response.body.list.length).toBe(20);
  });

  it('Get article by id: [/articles/:id]', async() => {
    const listRes = await request.get(`${host}/articles`);
    expect(listRes.statusCode).toBe(200);
    expect(listRes.body.list.length).toBe(20);

    const id = listRes.body.list[0].id;
    const response = await request.get(`${host}/articles/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
