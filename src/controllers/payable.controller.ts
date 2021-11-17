import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import { Payable, User } from '../entity'

export default class PayableController {
    static payable = async (req: Request, res: Response) => {
        const payableRepository = getRepository(Payable)

        if (!req.user) {
            return res.sendStatus(401)
        }

        const user = req.user as User

        const payablesBeforeUpdate = await payableRepository.find({where: {user: user.id}})

        let paid = 0
        let waitingFunds = 0
        let date = new Date()

        await Promise.all(
            payablesBeforeUpdate.map(async (payable) => {
            if (payable.payment_date <= date && payable.status == 'waiting_funds') {
                payable.status = 'paid'
                await payableRepository.save(payable)
            }
        }))

        const payablesAfterUpdate = await payableRepository.find({where: {user: req.user}})

        payablesAfterUpdate.map((payable) => {
            if (payable.status == 'paid') {
                paid += payable.amount_client
            }
            else {
                waitingFunds += payable.amount_client
            }

        })

        const payable = {
            paid: paid,
            waitingFunds: waitingFunds
        }

        res.status(200).send(payable)
    }
}