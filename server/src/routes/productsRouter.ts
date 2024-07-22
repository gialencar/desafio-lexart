import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';
import authMiddleware from '../middlewares/authMiddleware';

const controller = new ProductsController();

const productsRouter = Router();

productsRouter
  .get('/', authMiddleware, (req, res, next) => {
    controller.getAll(req, res, next);
  })
  .get('/:id', authMiddleware, (req, res, next) => {
    controller.getById(req, res, next);
  })
  .post('/', authMiddleware, (req, res, next) => {
    controller.create(req, res, next);
  })
  .put('/:id', authMiddleware, (req, res, next) => {
    controller.update(req, res, next);
  })
  .delete('/:id', authMiddleware, (req, res, next) => {
    controller.delete(req, res, next);
  });

export default productsRouter;
