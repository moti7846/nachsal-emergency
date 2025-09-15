import { soldiers } from "./accountRoute.js"
import { presence } from "./presenceRoute.js"
import { nachsal} from "./resetNachsal.js"

const configRoutes = (app) => {
    app.use('/auth', soldiers)
    app.use('/presence', presence)
    app.use('/nachsal', nachsal)
}

export {
    configRoutes
}