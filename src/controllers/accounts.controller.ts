import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AccountsController {
    static signUp = async (req: Request, res: Response) => {
        const userRepository = getRepository(User)

        const {username, email, first_name, last_name, password} = req.body

        const user = new User({username, email, first_name, last_name, password});
        const createdUser = await userRepository.save(user)

        res.status(201).send(createdUser)
    }
    
    static signIn = async (req: Request, res: Response) => {
        const userRepository = getRepository(User)

        const {username, email, first_name, last_name, password} = req.body

        const user = await userRepository.findOne({where: {username}})

        if (!user) return res.status(404)

        if (!bcrypt.compareSync(password, user.password)) return res.status(401)

        const token = jwt.sign({id: user.id}, 'xpto')

        res.status(200).send({token})
    }
}