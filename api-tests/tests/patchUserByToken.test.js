const request = require('supertest');
const { faker } = require('@faker-js/faker');

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);
const patchUserByToken_endpoint = '/api/v1/users'

let token;
let email = faker.internet.email();
let password = 'user123';

beforeEach(async () => {
    try {
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

describe('PATCH USER BY TOKEN', () => {
    test('PATCH /api/v1/users with valid token → 200', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                name: 'Updated User',
                email: 'new_email@gmail.com',
                password: 'newpassword123'
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success!');
    });

    test('PATCH /api/v1/users with invalid token → 403', async () => {
        const res = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', '123')
            .send({
                name: 'Updated User',
                email: 'new_email@gmail.com',
                password: 'newpassword123'
            });

        expect(res.status).toBe(403);
    });

     test('PATCH /api/v1/users without setting token → 403', async () => {
        const res = await api
            .patch(patchUserByToken_endpoint)
            .send({
                name: 'Updated User',
                email: 'new_email@gmail.com',
                password: 'newpassword123'
            });

        expect(res.status).toBe(403);
    });

     test('PATCH /api/v1/users without empty token → 403', async () => {
        const res = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', ' ')
            .send({
                name: 'Updated User',
                email: 'new_email@gmail.com',
                password: 'newpassword123'
            });

        expect(res.status).toBe(403);
    });

    test('PATCH /api/v1/users with updated name only → 200', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                name: 'Updated User'
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success!');
    });

    test('PATCH /api/v1/users with updated mail only → 200', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "email": "new_email@gmail.com"
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success!');
    });

    test('PATCH /api/v1/users with updated password only → 200', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "password": "newpassword123"
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success!');
    });

    test('PATCH /api/v1/users with updated mail and password  → 200', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "email": "new_email@gmail.com",
                "password": "newpassword123"
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success!');
    });
    test('PATCH /api/v1/users with empty request body → 400', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({});

        expect(patchRes.status).toBe(400);
    });
    test('PATCH /api/v1/users with invalid email formate → 400', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "email": "new_email"
            });

        expect(patchRes.status).toBe(400);
    });
    test('PATCH /api/v1/users with empty email → 400', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "email": " "
            });

        expect(patchRes.status).toBe(400);
    });
    test('PATCH /api/v1/users with empty password → 400', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "password": " "
            });

        expect(patchRes.status).toBe(400);
    });

    test('PATCH /api/v1/users with the same data as existed → 200', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "email": email,
                "password": password
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success!');

    });

    test('PATCH /api/v1/users with an extra field → 200', async () => {
        const patchRes = await api
            .patch(patchUserByToken_endpoint)
            .set('Authorization', token)
            .send({
                "email": email,
                "password": password,
                "age":20
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).not.toHaveProperty('age');

    });
});
afterEach(
  async () => {
  try {
    const res = await api
      .delete('/api/v1/users')
      .set('Authorization', token);

    expect(res.status).toBe(200);
  } catch (err) {
    console.error('Error in afterEach (deleting user):', err);
  }
}

)


