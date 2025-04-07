const request = require('supertest');
const app = require('../app'); // You'll need to export your Express app

describe('API Endpoints', () => {
  // Test the health check endpoint
  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  // Test chat endpoint
  test('POST /api/chat should handle chat messages', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({
        message: 'Hello, how are you?'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('response');
  });

  // Test authentication
  test('Protected routes should require authentication', async () => {
    const response = await request(app)
      .get('/api/protected-route')
      .set('Authorization', 'invalid-token');
    
    expect(response.statusCode).toBe(401);
  });
}); 