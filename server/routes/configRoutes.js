import authRoute from "./authRoute.js";
import presenceRoute from "./presenceRoute.js";
import nachsal from "./nachsalRoute.js";
import vapid from "./vapidRoute.js";
import reportRoute from "./reportRoute.js";

const configRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/presence", presenceRoute);
  app.use("/nachsal", nachsal);
  app.use("/vapid", vapid);
  app.use("/reports", reportRoute);
};

export { configRoutes };
