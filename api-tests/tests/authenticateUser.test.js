const request = require('supertest');
require('regenerator-runtime/runtime'); // ensure async/await works

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);

let token; // store token from successful login

describe('Authentication & Authorization Tests', () => {
  // -------- AUTHENTICATE USER --------
  test('POST /api/v1/auth with valid input → 200 ', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({
        "email": "user@gmail.com",
        "password": "user123"
        });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    console.log(res.body);
    
  });

  test('POST /api/v1/auth with unmatched mail and password → 200 ', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({
        "email": "user@gmail.com",
        "password": "user"
        });

    expect(res.status).toBe(401);
  });

  test('POST /api/v1/auth with missing body → 400', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({}); 
    expect(res.status).toBe(400);
  });


  test('POST /api/v1/auth with missing mail only → 400', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({
        "password": "user123"
      }); 
    expect(res.status).toBe(400);
  });
  
  test('POST /api/v1/auth with missing Password only → 400', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({
        "email": "user@gmail.com"
      }); 
    expect(res.status).toBe(400);
  });
  
  test('POST /api/v1/auth with invalid mail structure → 400', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({
        "email": "usergmail",
        "password": "user123"
      }); 
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/auth with empty mail → 400', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({
        "email": " ",
        "password": "user123"
      }); 
    expect(res.status).toBe(400);
  });

  test('POST /api/v1/auth with empty password → 400', async () => {
    const res = await api
      .post('/api/v1/auth')
      .send({
        "email": "user@gmail.com ",
        "password": " "
      }); 
    expect(res.status).toBe(400);
  });
  

});