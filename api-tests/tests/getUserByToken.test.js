const request = require('supertest');
const { faker } = require('@faker-js/faker');

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);
const get_user_endpoint = '/api/v1/users'

describe('Get User By Token', () => {

  let token;
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

      // Authenticate user
      const authRes = await api.post('/api/v1/auth').send({
        email,
        password
      });
      expect(authRes.status).toBe(200);
      token = authRes.body.token;
      console.log(token);

    } catch (err) {
      console.error('Error in beforeAll:', err);
      throw err;
    }
  });
  
  test('GET /api/v1/users with valid token → 200 ', async () => {

    const res = await api
      .get(get_user_endpoint)
      .set('Authorization', token);

    const requiredProps = [
        'id',
        'name',
        'email',
        'password',
        'imageUrl'
    ];

    expect(res.status).toBe(200);
    requiredProps.forEach(prop => {
        expect(res.body).toHaveProperty(prop);
        expect(res.body[prop]).not.toBeNull();
        expect(res.body[prop]).not.toBeUndefined();
    });
        
    });

    test('GET /api/v1/users with invalid token → 403 ', async () => {
      
      const token = '123'    
      const res = await api
        .get(get_user_endpoint)
        .set('Authorization', token);

      expect(res.status).toBe(403); 
          
      });

    test('GET /api/v1/users without setting token → 403 ', async () => {
 
      const res = await api
        .get(get_user_endpoint)

      expect(res.status).toBe(403); 
          
      });

    test('GET /api/v1/users with empty token → 403 ', async () => {
 
    const res = await api
      .get(get_user_endpoint)
      .set('Authorization', ' ');
      
    expect(res.status).toBe(403); 
        
    });
})

describe('Get user that is already deleted', () => {
  let token;
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

      // Authenticate user
      const authRes = await api.post('/api/v1/auth').send({
        email,
        password
      });
      expect(authRes.status).toBe(200);
      token = authRes.body.token;
      console.log(token);

      // Delete user
      const deleteRes = await api
        .delete('/api/v1/users')
        .set('Authorization', token);
      expect(deleteRes.status).toBe(200);

    } catch (err) {
      console.error('Error in beforeAll:', err);
      throw err;
    }
  });
  test('GET /api/v1/users with already deleted token → 403 ', async () => {
    const res = await api
      .get(get_user_endpoint)
      .set('Authorization', token);

    expect(res.status).toBe(403);
  });
});