import { ModelStatic } from 'sequelize';
import Product from '../db/models/product';

class ProductsService {
  private model: ModelStatic<Product> = Product;

  async getAll() {
    try {
      const products = await this.model.findAll();
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  async getById(id: number) {
    try {
      const product = await this.model.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }

  async create(data: Product) {
    try {
      const product = await this.model.create({ data });
      return product;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  async update(id: number, data: Product) {
    try {
      const product = await this.getById(id);
      await product.update(data);
      return product;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  async delete(id: number) {
    try {
      const product = await this.getById(id);
      await product.destroy();
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}

export default ProductsService;
