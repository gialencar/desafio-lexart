import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const controller = new UserController();

const userRouter = Router();

userRouter
  .get('/', (req, res, next) => {
    controller.getAll(req, res, next);
  })
  .post('/login', (req, res, next) => {
    controller.login(req, res, next);
  })
  .post('/register', (req, res, next) => {
    controller.register(req, res, next);
  });

export default userRouter;
