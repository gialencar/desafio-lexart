import request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/db/models';

afterAll(async () => {
  await sequelize.close();
});

describe('Product API', () => {
  let productId: number;

  it('Starts and have proper test environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(app).toBeDefined();
  }, 10000);

  it('should create a product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Xiaomi Redmi 9',
        brand: 'Xiaomi',
        model: 'Redmi 9',
        price: 1500,
        color: 'Red',
      })
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    productId = response.body.id;
  });

  it('should fetch a product by ID', async () => {
    const response = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Xiaomi Redmi 9');
  });

  it('should update a product', async () => {
    const response = await request(app)
      .put(`/products/${productId}`)
      .send({
        name: 'Xiaomi Redmi 9',
        brand: 'Xiaomi',
        model: 'Redmi 9',
        price: 1600,
        color: 'Blue',
      })
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(1600);
  });

  it('should return 404 for non-existent product', async () => {
    const response = await request(app)
      .get('/products/9999')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Product not found');
  });

  it('should delete a product', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(204);
  });
});
