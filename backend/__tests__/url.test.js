const request = require('supertest');
const app = require('../index');

describe('URL Controller Tests', () => {
  test('POST /api/generate-image with invalid URL returns 400', async () => {
    const response = await request(app)
      .post('/api/generate-image')
      .send({ url: 'invalid-url' });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('POST /api/generate-image with valid URL format but unreachable URL', async () => {
    const response = await request(app)
      .post('/api/generate-image')
      .send({ url: 'https://this-url-does-not-exist-123456789.com' });

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  // Add more tests for successful image generation
  // Note: You would need to mock external services like axios and canvas
});
