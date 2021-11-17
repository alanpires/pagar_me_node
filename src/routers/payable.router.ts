import {Express, Router} from 'express';
import PayableController from '../controllers/payable.controller';
import jwtStrategy from '../middlewares/jwtStrategy';
import passport from 'passport';

const router = Router()

export default (app: Express) => {
    passport.use(jwtStrategy())

    router.get('/payables', passport.authenticate('jwt', {session: false}), PayableController.payable)

    app.use('/api', router)
}