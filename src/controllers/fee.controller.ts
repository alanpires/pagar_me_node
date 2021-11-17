import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Fee } from '../entity'

export default class FeeController {
    static fee = async (req: Request, res: Response) => {
        const feeRepository = getRepository(Fee)

        const fee = new Fee()

        const createdFee = await feeRepository.save({...fee, ...req.body})

        res.status(201).send(createdFee)
    }
}