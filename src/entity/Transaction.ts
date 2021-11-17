import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    amount!: number;

    @Column()
    description!: string;

    @Column()
    payment_method!: string;

    @Column()
    card_number!: string;

    @Column()
    cardholders_name!: string;

    @Column()
    card_expiring_date!: Date;

    @Column()
    cvv!: string;

    @Column()
    date_transaction!: Date;

    @Column()
    client_id!: number;

}
