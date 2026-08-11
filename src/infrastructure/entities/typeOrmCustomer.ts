import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity({name: "customer"}) // Database table name. If not specified, the table name will be the same as the class name. If that classname is changed, queries will fail without throwing error, because TypeORM will not find the existing entity by that new name.
export class TypeORMCustomer {

    @PrimaryGeneratedColumn() // * Every Entity must have a primary key. Using Generated this key is autoincremented 
    id: number; // * number is mapped by default as integer in the DB.

    @Column({length: 80})
    name: string // * String is mapped to varchar(255) by default

    @Column({length: 100})
    lastname: string

    @Column()
    phone: number

    @Column()
    registrationDate: Date

}