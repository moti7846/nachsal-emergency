import { soldiers } from "./accountRoute.js"
import { presence } from "./presenceRoute.js"

const configRoutes = (app) => {
    app.use('/soldiers', soldiers)
    app.use('/presence', presence)
}

export {
    configRoutes
}