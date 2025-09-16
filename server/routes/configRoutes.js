// import authRoute from "./authRoute.js";
// import reportRoute from "./reportRoute.js";
// import pushRoutes from "./pushRoutes.js";
// import alertsRoutes from "./alertsRoutes.js";
// import statusRoutes from "./statusRoutes.js";
// import nachsal from "./nachsalRoute.js";

// const configRoutes = (app) => {
//   app.use("/auth", authRoute);
//   app.use("/reports", reportRoute);
//   app.use("/nachsal", nachsal)
//   app.use("/push", pushRoutes);
//   app.use("/alerts", alertsRoutes);
//   app.use("/status", statusRoutes);
// };

// export { configRoutes };



// routes/configRoutes.js
import authRoute from "./authRoute.js";
import reportRoute from "./reportRoute.js";
import pushRoutes from "./pushRoutes.js";
import alertsRoutes from "./alertsRoutes.js";
import statusRoutes from "./statusRoutes.js";
import nachsal from "./nachsalRoute.js";

const configRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/reports", reportRoute);

  // ✅ ensure the "c" is present here
  app.use("/nachsal", nachsal);
  console.log("[routes] mounted /nachsal"); // DEBUG

  app.use("/push", pushRoutes);
  app.use("/alerts", alertsRoutes);
  app.use("/status", statusRoutes);
};

export { configRoutes };
