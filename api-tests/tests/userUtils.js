async function createAuthAndDeleteUser(api, email, password) {
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
    const token = authRes.body.token;
    
    // Delete user
    const deleteRes = await api
      .delete('/api/v1/users')
      .set('Authorization', token);
    expect(deleteRes.status).toBe(200);

    return token; 
  } catch (err) {
    console.error('Error in createAuthAndDeleteUser:', err);
    throw err;
  }
}

module.exports = { createAuthAndDeleteUser };
