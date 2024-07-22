import { Router } from 'express';
import externalProductsRouter from './externalProductsRouter';
import productsRouter from './productsRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/products', productsRouter);
router.use('/external/products', externalProductsRouter);

export default router;
