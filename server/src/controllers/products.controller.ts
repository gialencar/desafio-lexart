import { NextFunction, Request, Response } from 'express';
import ProductsService from '../services/products.service';

export class ProductsController {
  private service = new ProductsService();

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.service.getById(id);
      if (!user) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.service.update(id, req.body);
      if (!user) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.service.delete(id);
      if (!deleted) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
