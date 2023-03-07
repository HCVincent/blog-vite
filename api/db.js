import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_KEY,
  database: "blog",
});
