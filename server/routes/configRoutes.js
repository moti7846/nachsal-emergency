import authRoute from "./authRoute.js";
import reportRoute from "./reportRoute.js";
import pushRoutes from "./pushRoutes.js";
import alertsRoutes from "./alertsRoutes.js";
import statusRoutes from "./statusRoutes.js";

const configRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/reports", reportRoute);
  app.use("/push", pushRoutes);
  app.use("/alerts", alertsRoutes);
  app.use("/status", statusRoutes);
};

export { configRoutes };
