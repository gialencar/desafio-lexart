import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routeNotFound from './middlewares/routeNotFound';
import router from './routes';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/healthcheck', (_req, res) => {
  res.json({ message: 'Server is running' });
});

app.use(routeNotFound);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: {message: err.message} });
});

export default app;
