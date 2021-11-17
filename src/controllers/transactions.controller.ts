import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Transaction, Fee, User, Payable } from '../entity';
import TransactionService from '../services/transaction.services';
import PayableService from '../services/payable.service';

export default class TransactionsController {
    static createTransaction = async (req: Request, res: Response) => {
        // Criar Transaction
        const transactionRepository = getRepository(Transaction)

        const transaction = TransactionService.createTransaction(req.body)

        const createdTransaction = await transactionRepository.save(transaction)

        // Pegar última taxa cadastrada no sistema
        const feeRepository = getRepository(Fee)

        const fee = await feeRepository.findOne({order: {id: 'DESC'}})
        
        if (fee == undefined) {
            return res.send('Fee não encontrado')
        }    
        
        // Pega o usuário da transação conforme client_id
        const userRepository = getRepository(User)

        const user = await userRepository.findOne(req.body.client_id)

        if (user == undefined) {
            return res.send('User not found')
        }

        // Criar Payable
        const payableRepository = getRepository(Payable)

        const payable = PayableService.createPayable(transaction, user, fee)

        await payableRepository.save(payable)

        res.status(201).send(createdTransaction)
    }

    static getTransaction = async (req: Request, res: Response) => {
        const transactionRepository = getRepository(Transaction)

        const allTransactions: Transaction[] = await transactionRepository.find()

        res.status(200).send(allTransactions)
    }
}