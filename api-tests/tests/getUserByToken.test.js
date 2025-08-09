const request = require('supertest');
require('regenerator-runtime/runtime'); // ensure async/await works

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOjQxOTIzLCJpYXQiOjE3NTQ3NTIzNDgsImV4cCI6MTc1NDgzODc0OH0.Q97X_1VcSyI5yI8K6g34YcN3b6GOfSz_ZUssnOkwqe0 ';

describe('Get User By Token', () => {
  
  test('GET /api/v1/users with valid token → 200 ', async () => {

    const res = await api
      .get('/api/v1/users')
      .set('Authorization', token);

    const requiredProps = [
        'id',
        'name',
        'email',
        'password',
        'imageUrl'
    ];

    requiredProps.forEach(prop => {
        expect(res.body).toHaveProperty(prop);
        expect(res.body[prop]).not.toBeNull();
        expect(res.body[prop]).not.toBeUndefined();
    });
        
    });

    test('GET /api/v1/users with invalid token → 403 ', async () => {

    const token = '123'    
    const res = await api
      .get('/api/v1/users')
      .set('Authorization', token);

    expect(res.status).toBe(403); 
        
    });

    test('GET /api/v1/users without setting token → 403 ', async () => {
 
    const res = await api
      .get('/api/v1/users')

    expect(res.status).toBe(403); 
        
    });

    test('GET /api/v1/users with empty token → 403 ', async () => {
 
    const res = await api
      .get('/api/v1/users')
      .set('Authorization', ' ');
      
    expect(res.status).toBe(403); 
        
    });
})
