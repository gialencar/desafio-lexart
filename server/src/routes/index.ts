import { Router } from 'express';
import productsRouter from './productsRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/products', productsRouter);

export default router;
