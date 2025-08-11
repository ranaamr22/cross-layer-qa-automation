const request = require('supertest');
const { faker } = require('@faker-js/faker');

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);
const create_user_endpoint = '/api/v1/users';

describe('Create User Tests', () => {
  
  test('POST /api/v1/users with valid input → 200 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": "test",
        "email": faker.internet.email(),
        "password": "test123"
        });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User registered with success');
    expect(res.body).toHaveProperty('token');
    
  });

  test('POST /api/v1/users with empty input → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({});

    expect(res.status).toBe(400);
    
  });

  test('POST /api/v1/users with missing name → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "email": "user@gmail.com",
        "password": "user123"});

    expect(res.status).toBe(400);
    
  });

  test('POST /api/v1/users with missing email → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": "user",
        "password": "user123"});

    expect(res.status).toBe(400);
    
  });

  test('POST /api/v1/users with missing password → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": "user",
        "email": "user@gmail.com"});

    expect(res.status).toBe(400);
    
  });

  test('POST /api/v1/users with invalid mail format → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": "user",
        "email": "usergmail",
        "password": "user123"});

    expect(res.status).toBe(400);
    
  });

  test('POST /api/v1/users with empty name → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": " ",
        "email": "user@gmail.com",
        "password": "user123"});

    expect(res.status).toBe(400);
    
  });

  test('POST /api/v1/users with empty email → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": "user",
        "email": " ",
        "password": "user123"});

    expect(res.status).toBe(400);
    
  });

  test('POST /api/v1/users with empty password → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": "user",
        "email": "user@gmail.com",
        "password": " "});

    expect(res.status).toBe(400);
    
  });
  test('POST /api/v1/users with already existing mail → 400 ', async () => {
    const res = await api
      .post(create_user_endpoint)
      .send({
        "name": "test",
        "email": "test@gmail.com",
        "password": "test123"});

    expect(res.status).toBe(400);
    
  });
})
