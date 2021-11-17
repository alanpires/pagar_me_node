import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import {Transaction, Fee, User} from "./index"

@Entity()
export class Payable {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status!: string;

    @Column()
    payment_date!: Date;

    @Column()
    amount_client!: number;

    @OneToOne(() => Transaction, {cascade: true})
    @JoinColumn()
    transaction!: Transaction

    @ManyToOne(() => Fee, fee => fee.payable, {cascade: true})
    fee!: Fee;

    @ManyToOne(() => User, user => user.payable, {cascade: true})
    user!: User;
    
}
