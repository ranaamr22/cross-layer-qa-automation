const request = require('supertest');
require('regenerator-runtime/runtime'); // ensure async/await works

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);


describe('DELETE ALL USERS', () => {
  
  test('DELETE /api/v1/all-users with valid input → 200 ', async () => {
    const res = await api
      .delete('/api/v1/all-users')
      .send(
        {
           "key_admin": "keyadmin123"
        }
      );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Users deleted with success');
    
  });

  test('DELETE /api/v1/all-users with empty input → 400 ', async () => {
    const res = await api
      .delete('/api/v1/all-users')
      .send(
        {}
      );

    expect(res.status).toBe(400);
  });

  test('DELETE /api/v1/all-users with invalid key → 400 ', async () => {
    const res = await api
      .delete('/api/v1/all-users')
      .send(
        {
            "admin": "keyadmin123"
        }
      );

    expect(res.status).toBe(400);
  });

  test('DELETE /api/v1/all-users with empty value → 400 ', async () => {
    const res = await api
      .delete('/api/v1/all-users')
      .send(
        {
            "key_admin": " "
        }
      );

    expect(res.status).toBe(400);
  });
})
