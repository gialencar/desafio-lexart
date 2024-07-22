import request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/db/models';

afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error('Error during database close:', error);
  }
});

describe('External Products API endpoints', () => {
  it('should create a product with structure number 1', async () => {
    const response = await request(app)
      .post('/external/products')
      .send({
        name: 'Xiaomi Redmi 9',
        brand: 'Xiaomi',
        model: 'Redmi 9',
        price: 1500,
        color: 'Red',
      })
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Products added successfully');
  });

  it('should create a product with structure number 2', async () => {
    const response = await request(app)
      .post('/external/products')
      .send({
        name: 'Xiaomi Redmi 9',
        details: {
          brand: 'Xiaomi',
          model: 'Redmi 9',
          color: 'Red',
        },
        price: 1500,
      })
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Products added successfully');
  });

  it('should create multiple products with structure number 3', async () => {
    const response = await request(app)
      .post('/external/products')
      .send([
        {
          name: 'Xiaomi Redmi 9',
          brand: 'Xiaomi',
          model: 'Redmi 9',
          data: [
            { price: 1500, color: 'Red' },
            { price: 1600, color: 'Blue' },
          ],
        },
        {
          name: 'iPhone 14 Pro',
          brand: 'Apple',
          model: '14 Pro',
          data: [
            { price: 7500, color: 'Silver' },
            { price: 7600, color: 'Gold' },
          ],
        },
      ])
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Products added successfully');
  });
});
