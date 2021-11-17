import {ExtractJwt, Strategy, StrategyOptions} from 'passport-jwt'
import { User } from '../entity'
import { getRepository } from 'typeorm'

export default (): Strategy => {
    const options: StrategyOptions = {
        secretOrKey: 'xpto',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const verify = async (jwt_payload: any, done: any) => {
        const userRepository = getRepository(User)
        const user = await userRepository.findOne(jwt_payload.id)

        done(null, user ? user : false)
    }

    return new Strategy(options, verify)
}