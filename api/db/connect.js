import { createPool } from "mysql2/promise";
import config from "../config/config.js";

const {
  dbConfig: { user, password, host, database },
} = config;
const connection = createPool({
  user,
  password,
  host,
  database,
});

export default connection;
