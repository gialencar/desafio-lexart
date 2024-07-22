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
        return;
      }
      return product;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }

  async create({ name, brand, model, price, color }: Product) {
    try {
      const product = await this.model.create({
        name,
        brand,
        model,
        price,
        color,
      });
      return product;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  async update(id: number, { name, brand, model, price, color }: Product) {
    try {
      const product = await this.getById(id);
      if (!product) {
        return;
      }
      await product.update({ name, brand, model, price, color });
      return product;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }

  async delete(id: number) {
    try {
      const product = await this.getById(id);
      if (!product) {
        return;
      }
      await product.destroy();
      return product;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}

export default ProductsService;
