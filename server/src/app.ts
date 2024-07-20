import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routeNotFound from './middlewares/routeNotFound';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/healthcheck', (_req, res) => {
  res.json({ message: 'Server is running' });
});

app.use(routeNotFound);

export default app;
