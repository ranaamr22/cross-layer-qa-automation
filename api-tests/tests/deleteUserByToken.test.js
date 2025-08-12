const request = require('supertest');
const { faker } = require('@faker-js/faker');
const { createAuthAndDeleteUser } = require('./userUtils.js');

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);
const deleteUserByToken_endpoint = '/api/v1/users';

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
      .delete(deleteUserByToken_endpoint)
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted with success!');
  });

  test('DELETE /api/v1/users with missing token → 403 ', async () => {
    const response = await api
      .delete(deleteUserByToken_endpoint);

    expect(response.status).toBe(403);
  });

  test('DELETE /api/v1/users with invalid token → 403 ', async () => {
    const token = '123'
    const response = await api
      .delete(deleteUserByToken_endpoint)
      .set('Authorization',token);

    expect(response.status).toBe(403);
  });

  test('DELETE /api/v1/users with empty token → 403 ', async () => {
    const response = await api
      .delete(deleteUserByToken_endpoint)
      .set('Authorization',' ');

    expect(response.status).toBe(403);
  });
});

describe('Delete user already deleted before', () => {
  let token;
  let email = 'test@gmail.com';
  const password = 'test123';

  beforeAll(async () => {
      token =await createAuthAndDeleteUser(api, email, password);
  });

  test('DELETE /api/v1/users with already deleted token → 403 ', async () => {
    const res = await api
      .delete(deleteUserByToken_endpoint)
      .set('Authorization', token);

    expect(res.status).toBe(403);
  });
});


