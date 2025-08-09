const request = require('supertest');
const { faker } = require('@faker-js/faker');

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);

let token;

beforeEach(async () => {
    try {
        const email = faker.internet.email();
        const password = 'user123';

        const createRes = await api.post('/api/v1/users').send({
            name: 'Test User',
            email,
            password
        });
        console.log('Create user response:', createRes.status, createRes.body);

        const authRes = await api.post('/api/v1/auth').send({
            email,
            password
        });
        console.log('Auth response:', authRes.status, authRes.body);

        token = authRes.body.token;
    } catch (err) {
        console.error('Error in beforeAll:', err);
        throw err; 
    }
});

describe('DELETE USER BY TOKEN', () => {
  
  test('DELETE /api/v1/users with a valid token → 200 ', async () => {
    const response = await api
      .delete('/api/v1/users')
      .set('Authorization', token);
      console.log(token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted with success');
  });

  test('DELETE /api/v1/users with missing token → 403 ', async () => {
    const response = await api
      .delete('/api/v1/users');

    expect(response.status).toBe(403);
  });

  test('DELETE /api/v1/users with invalid token → 403 ', async () => {
    const token = '123'
    const response = await api
      .delete('/api/v1/users')
      .set('Authorization',token);

    expect(response.status).toBe(403);
  });

  test('DELETE /api/v1/users with empty token → 403 ', async () => {
    const response = await api
      .delete('/api/v1/users')
      .set('Authorization',' ');

    expect(response.status).toBe(403);
  });

  test('DELETE /api/v1/users with already deleted token → 403 ', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkRhcmVuLkNvbnJveUBnbWFpbC5jb20iLCJpZCI6MzIxNjIsImlhdCI6MTc1NDc2NzIxMCwiZXhwIjoxNzU0ODUzNjEwfQ.wqR4YUx7UXzeMxI4S4vVoILhdWOjNNf0mcTpHNbsEBA'
    const response = await api
      .delete('/api/v1/users')
      .set('Authorization',token);

    expect(response.status).toBe(403);
  });
});




