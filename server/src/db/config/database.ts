import 'dotenv/config';
import pg from 'pg';
import { Options } from 'sequelize';

const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE } =
  process.env;

const config: Options = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  host: POSTGRES_HOST,
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export = config;
