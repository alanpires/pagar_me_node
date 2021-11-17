import {Express, Router} from 'express'
import TransactionsController from '../controllers/transactions.controller'
import { transactionValidator } from '../middlewares/validators/transaction.validator'
import jwtStrategy from '../middlewares/jwtStrategy'
import passport from 'passport'

const router = Router()

export default (app: Express) => {
    passport.use(jwtStrategy())

    router.get('/transactions', TransactionsController.getTransaction)
    router.post('/transactions', transactionValidator, TransactionsController.createTransaction)

    app.use('/api', router)
}