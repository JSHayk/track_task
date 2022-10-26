import config from "./config/config.js";
import express from "express";
import store from "./store/index.js";
import router from "./routes/router.js";

const app = express();
// MiddleWares.
app.use(express.json());
app.use(router);

// App Configuration.
const { appConfig } = config;

setInterval(store.sync, 1000);

(async () => {
  await store.sync();
  app.listen(appConfig.port, () =>
    console.log(`Server has been listened on port ${appConfig.port}`)
  );
})();
