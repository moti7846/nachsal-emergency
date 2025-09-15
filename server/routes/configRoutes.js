import soldiersRoute from "./accountRoute.js";
import authRoute from "./authRoute.js";
import presenceRoute from "./presenceRoute.js";
import nachsal from "./resetNachsal.js";

const configRoutes = (app) => {
  app.use("/soldiers", soldiersRoute);
  app.use("/auth", authRoute);
  app.use("/presence", presenceRoute);
  app.use("/nachsal", nachsal);
};

export { configRoutes };
