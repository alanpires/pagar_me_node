import { Transaction, Fee, User, Payable } from "../entity"
import { getRepository } from "typeorm"

export default class PayableService {
    static defineStatus = (transaction: Transaction) => {
        if (transaction.payment_method == 'debit_card') {
            return 'paid'
        } else {
            return 'waiting_funds'
        }
    }

    static definePaymentDate = (transaction: Transaction) => {
        if (transaction.payment_method == 'debit_card') {
            return transaction.date_transaction
        } else {
            const payment_date = transaction.date_transaction
            payment_date.setDate(payment_date.getDate() + 30)
            return payment_date
        }
    }

    static calculateAmountClient = (transaction: Transaction, fee: Fee) => {
        if (transaction.payment_method == 'debit_card') {
            return transaction.amount - transaction.amount * fee.debitFee / 100
        } else {
            return transaction.amount - transaction.amount * fee.creditFee / 100
        }
    }

    static createPayable = (transaction: Transaction, user: User, fee: Fee) => {
        const payable = new Payable()

        payable.transaction = transaction
        payable.fee = fee
        payable.user = user
        payable.status = this.defineStatus(transaction)
        payable.payment_date = this.definePaymentDate(transaction)
        payable.amount_client = this.calculateAmountClient(transaction, fee)

        return payable
    }
}