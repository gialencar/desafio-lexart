import { Router } from 'express';
import { ExternalProductsController } from '../controllers/externalProducts.controller';
import authMiddleware from '../middlewares/authMiddleware';

const controller = new ExternalProductsController();

const externalProductsRouter = Router();

externalProductsRouter.post('/', authMiddleware, (req, res, next) => {
  controller.create(req, res, next);
});

export default externalProductsRouter;
