import {Router, Express} from 'express'
import AccountsController from '../controllers/accounts.controller'

const router = Router()

export default (app: Express) => {
    router.post('/signup/', AccountsController.signUp)
    router.post('/signin/', AccountsController.signIn)

    app.use('/api/', router)
}