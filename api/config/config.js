import dotenv from "dotenv";
dotenv.config();

export default {
  appConfig: {
    port: process.env.PORT || 4000,
  },
  dbConfig: {},
};
