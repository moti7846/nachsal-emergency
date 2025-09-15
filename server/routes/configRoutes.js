import authRoute from "./authRoute.js";
import reportRoute from "./reportRoute.js";

const configRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/reports", reportRoute);
};


export { configRoutes };
