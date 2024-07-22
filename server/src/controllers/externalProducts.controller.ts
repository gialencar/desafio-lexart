import { NextFunction, Request, Response } from 'express';
import Product from '../db/models/product';
import ProductsService from '../services/products.service';

export class ExternalProductsController {
  private service = new ProductsService();

  async create(req: Request, res: Response, _next: NextFunction) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Missing data' });
    }
    try {
      if (Array.isArray(data)) {
        for (const product of data) {
          if (product.data && Array.isArray(product.data)) {
            for (const item of product.data) {
              await this.service.create({
                name: product.name,
                brand: product.brand,
                model: product.model,
                price: item.price,
                color: item.color,
              } as Product);
            }
          }
        }
      } else if (data.details) {
        await this.service.create({
          name: data.name,
          brand: data.details.brand,
          model: data.details.model,
          price: data.price,
          color: data.details.color,
        } as Product);
      } else {
        await this.service.create({
          name: data.name,
          brand: data.brand,
          model: data.model,
          price: data.price,
          color: data.color,
        } as Product);
      }

      res.status(201).json({ message: 'Products added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add products' });
    }
  }
}
