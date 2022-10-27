import dotenv from "dotenv";
dotenv.config();

export default {
  appConfig: {
    port: process.env.PORT || 4000,
  },
  dbConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  },
};
