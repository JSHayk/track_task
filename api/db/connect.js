import { createPool } from "mysql2/promise";

const connection = createPool({
  user: "root",
  password: "JavaScripth1_mysql",
  host: "localhost",
  database: "track_task",
});

export default connection;
