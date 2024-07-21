import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

export class UserController {
  private service = new UserService();

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login({ email, password });
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await this.service.register({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
