const request = require('supertest');
require('regenerator-runtime/runtime'); // ensure async/await works

const PORT = process.env.MOCK_AUTH_PORT || '8080';
const BASE = `http://localhost:${PORT}`;
const api = request(BASE);
const deleteAllUsers_endpoint = '/api/v1/all-users';


describe('DELETE ALL USERS', () => {
  
  test('DELETE /api/v1/all-users with valid input → 200 ', async () => {
    const res = await api
      .delete(deleteAllUsers_endpoint)
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
      .delete(deleteAllUsers_endpoint)
      .send(
        {}
      );

    expect(res.status).toBe(400);
  });

  test('DELETE /api/v1/all-users with invalid key → 400 ', async () => {
    const res = await api
      .delete(deleteAllUsers_endpoint)
      .send(
        {
            "admin": "keyadmin123"
        }
      );

    expect(res.status).toBe(400);
  });

  test('DELETE /api/v1/all-users with invalid Value → 403 ', async () => {
    const res = await api
      .delete(deleteAllUsers_endpoint)
      .send(
        {
            "key_admin": "keyadmin"
        }
      );

    expect(res.status).toBe(403);
  });

  test('DELETE /api/v1/all-users with empty value → 400 ', async () => {
    const res = await api
      .delete(deleteAllUsers_endpoint)
      .send(
        {
            "key_admin": " "
        }
      );

    expect(res.status).toBe(400);
  });

  test('DELETE /api/v1/all-users with no users → 200 ', async () => {
    //delete all users at first
    await api
      .delete(deleteAllUsers_endpoint)
      .send(
        {
           "key_admin": "keyadmin123"
        }
      );

    //trigger deleteAllUsers end point again 
    const res = await api
      .delete(deleteAllUsers_endpoint)
      .send(
        {
            "key_admin": "keyadmin123"
        }
    );
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Users deleted with success');
  });
})
