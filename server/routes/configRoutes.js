import soldiersRoute from "./accountRoute.js";
import authRoute from "./authRoute.js";
import presenceRoute from "./presenceRoute.js";

const configRoutes = (app) => {
  app.use("/soldiers", soldiersRoute);
  app.use("/auth", authRoute);
  app.use("/presence", presenceRoute);
};

export { configRoutes };
