import request from 'supertest';
import app from '../../src/app';

describe('App', () => {
  it('Starts and have proper test environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(app).toBeDefined();
  }, 10000);

  test('/healthcheck route returns a message', async () => {
    const response = await request(app).get('/healthcheck');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Server is running');
  });

  it('should return 404 and "Route not found" for unknown routes', async () => {
    jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

    const response = await request(app).get('/foobar');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Route not found');
  });
});
