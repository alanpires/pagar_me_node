import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Payable } from ".";

@Entity()
export class Fee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    creditFee!: number;

    @Column()
    debitFee!: number;

    @OneToMany(() => Payable, payable => payable.fee)
    payable!: Payable[];
}
