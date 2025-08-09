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

describe('PATCH USER BY TOKEN', () => {
    test('PATCH /api/v1/users with valid token → 200', async () => {
        const patchRes = await api
            .patch('/api/v1/users')
            .set('Authorization', token)
            .send({
                name: 'Updated User',
                email: 'new_email@gmail.com',
                password: 'newpassword123'
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success');
    });

    test('PATCH /api/v1/users with invalid token → 403', async () => {
        const res = await api
            .patch('/api/v1/users')
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
            .patch('/api/v1/users')
            .send({
                name: 'Updated User',
                email: 'new_email@gmail.com',
                password: 'newpassword123'
            });

        expect(res.status).toBe(403);
    });

     test('PATCH /api/v1/users without empty token → 403', async () => {
        const res = await api
            .patch('/api/v1/users')
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
            .patch('/api/v1/users')
            .set('Authorization', token)
            .send({
                name: 'Updated User'
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success');
    });

    test('PATCH /api/v1/users with updated mail only → 200', async () => {
        const patchRes = await api
            .patch('/api/v1/users')
            .set('Authorization', token)
            .send({
                "email": "new_email@gmail.com"
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success');
    });

    test('PATCH /api/v1/users with updated password only → 200', async () => {
        const patchRes = await api
            .patch('/api/v1/users')
            .set('Authorization', token)
            .send({
                "password": "newpassword123"
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success');
    });

    test('PATCH /api/v1/users with updated mail and password  → 200', async () => {
        const patchRes = await api
            .patch('/api/v1/users')
            .set('Authorization', token)
            .send({
                "email": "new_email@gmail.com",
                "password": "newpassword123"
            });

        expect(patchRes.status).toBe(200);
        expect(patchRes.body).toHaveProperty('message', 'User updated with success');
    });
});

