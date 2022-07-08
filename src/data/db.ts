import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connectionsConfig:pg.Pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5432/postgres",
});

// if (process.env.MODE === "PROD") {
//   connectionsConfig.ssl = {
//     rejectUnauthorized: false,
//   };
// }

const connection = connectionsConfig;
export default connection;
