import {Request, Response, NextFunction} from 'express'

export const transactionValidator = (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body;

    if (requestBody.amount !== undefined &&
        requestBody.description !== undefined &&
        requestBody.payment_method !== undefined &&
        requestBody.card_number !== undefined &&
        requestBody.cardholders_name !== undefined &&
        requestBody.card_expiring_date !== undefined &&
        requestBody.cvv !== undefined
        ) {
            return next()
        }

        return res.status(400).send('Invalid/Missing Transaction Fields')
}