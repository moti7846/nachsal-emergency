import { soldiers } from "./accountRoute.js"
import { presence } from "./presenceRoute.js"
import { resetReport} from "./resetReport.js"

const configRoutes = (app) => {
    app.use('/auth', soldiers)
    app.use('/presence', presence)
    app.use('/nachsal', resetReport)
}

export {
    configRoutes
}