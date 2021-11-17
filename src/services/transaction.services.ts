import { Transaction } from "../entity"

export default class TransactionService {
    static convertedDate = (date: string) => {
        const dateComponents = date.split('-')
        const month = dateComponents[0]
        const year = dateComponents[1]
        // O primeiro mês (Janeiro é 0), logo dessa forma, quando passamos o mês 4 (abril) na função fullDate,
        // ele vai considerar como sendo o mês de maio.
        // Definir o parâmetro day como 0, significa um dia a menos que o primeiro dia do mês, 
        // que é o último dia do mês anterior
        // Ex: ano: 2020 / mês: 4
        // Logo nesse caso, a data no sistema seria (2020, 4, 30)
        const fullDate = new Date(Number(year), Number(month), 0)
        return fullDate
    }

    static createTransaction = (reqBody: any) => {
        const {
            amount, 
            description, 
            payment_method, 
            card_number, 
            cardholders_name, 
            card_expiring_date, 
            cvv, 
            client_id
        } = reqBody

        const transaction = new Transaction()

        transaction.amount = amount
        transaction.description = description
        transaction.payment_method = payment_method
        transaction.card_number = card_number.slice(-4)
        transaction.cardholders_name = cardholders_name
        transaction.card_expiring_date = this.convertedDate(card_expiring_date)
        transaction.cvv = cvv
        transaction.client_id = client_id
        transaction.date_transaction = new Date()

        return transaction

    }
}