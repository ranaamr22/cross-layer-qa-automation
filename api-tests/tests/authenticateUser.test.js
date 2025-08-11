const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { createAuthAndDeleteUser } = require('./userUtils.js');

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);
const auth_endpoint = '/api/v1/auth';

describe('Authentication & Authorization Tests', () => {

  let email = faker.internet.email();
  const password = 'Test@123';

  beforeAll(async () => {
    try {
      // Create user
      const createRes = await api.post('/api/v1/users').send({
        name: 'Test User',
        email,
        password
      });
      expect(createRes.status).toBe(200);

    } catch (err) {
      console.error('Error in beforeAll:', err);
      throw err;
    }
  });
  
  test('POST /api/v1/auth with valid input → 200 ', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        "email": email,
        "password": password
        });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /api/v1/auth with unmatched mail and password → 401 ', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        "email": "user@gmail.com",
        "password": "user"
        });

    expect(res.status).toBe(401);
  });

  test('POST /api/v1/auth with missing body → 400', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({}); 
    expect(res.status).toBe(400);
  });


  test('POST /api/v1/auth with missing mail only → 400', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        "password": "user123"
      }); 
    expect(res.status).toBe(400);
  });
  
  test('POST /api/v1/auth with missing Password only → 400', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        "email": "user@gmail.com"
      }); 
    expect(res.status).toBe(400);
  });
  
  test('POST /api/v1/auth with invalid mail structure → 400', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        "email": "usergmail",
        "password": "user123"
      }); 
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/auth with empty mail → 400', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        "email": " ",
        "password": "user123"
      }); 
    expect(res.status).toBe(400);

  });

  test('POST /api/v1/auth with empty password → 400', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        "email": "user@gmail.com ",
        "password": " "
      }); 
    expect(res.status).toBe(400);
  });
  

});

describe('Deleted user cannot authorize', () => {
  let token;
  let email = 'test@gmail.com';
  const password = 'test123';

  beforeAll(async () => {
    token = await createAuthAndDeleteUser(api, email, password);
  });

  test('Authorization with deleted user token → 401', async () => {
    const res = await api
      .post(auth_endpoint)
      .send({
        email,
        password
      });

    expect(res.status).toBe(401);
  });
});