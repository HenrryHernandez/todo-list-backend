import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.DATABASE || 'todo-lists-db',
  process.env.DB_USER || 'root',
  process.env.DB_USER_PASSWORD || '12345678',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000,
    },
  }
);

export default db;
