import {Express, Router} from 'express'
import FeeController from "../controllers/fee.controller";

const router = Router()

export default (app: Express) => {
    router.post('/fee', FeeController.fee)

    app.use('/api', router)
}