import pkg from "pg";
import { DATABASE_URL } from "./serverConfig";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export default pool;
