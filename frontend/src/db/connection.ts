import mysql, { Pool, PoolOptions } from 'mysql2/promise';

const poolConfig: PoolOptions = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root_password',
  database: process.env.MYSQL_DATABASE || 'sip_calculator',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const globalForDb = globalThis as unknown as { dbPool?: Pool };

export const db = globalForDb.dbPool ?? mysql.createPool(poolConfig);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.dbPool = db;
}
