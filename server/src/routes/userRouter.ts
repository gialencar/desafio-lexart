import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import authMiddleware from '../middlewares/authMiddleware';

const controller = new UserController();

const userRouter = Router();

userRouter
  .get('/', authMiddleware, (req, res, next) => {
    controller.getAll(req, res, next);
  })
  .post('/login', (req, res, next) => {
    controller.login(req, res, next);
  })
  .post('/register', (req, res, next) => {
    controller.register(req, res, next);
  });

export default userRouter;
