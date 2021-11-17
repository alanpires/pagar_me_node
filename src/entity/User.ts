import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate} from "typeorm";
import { Payable } from ".";
import bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column()
    password!: string;

    @OneToMany(() => Payable, payable => payable.user)
    payable!: Payable[]

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

}
