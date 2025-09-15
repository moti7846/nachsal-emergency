import authRoute from "./authRoute.js";
import presenceRoute from "./presenceRoute.js";
import nachsal from "./nachsalRoute.js";
import push from "./pushRoute.js";
import reportRoute from "./reportRoute.js";

const configRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/presence", presenceRoute);
  app.use("/nachsal", nachsal);
  app.use("/push", push);
  app.use("/reports", reportRoute);
};

export { configRoutes };
