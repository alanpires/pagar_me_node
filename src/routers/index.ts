import {Express} from 'express';
import AccountRouter from './accounts.router'
import FeeRouter from './fee.router'
import PayableRouter from './payable.router'
import TransactionsRouter from './transactions.router'

export default (app: Express) => {
    AccountRouter(app)
    FeeRouter(app)
    PayableRouter(app)
    TransactionsRouter(app)
}
