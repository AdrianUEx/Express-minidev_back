import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class TypeORMAuthor {

    @PrimaryGeneratedColumn() // * Every Entity must have a primary key. Using Generated this key is autoincremented 
    id: number // * number is mapped by default as integer in the DB.

    @Column({length: 80})
    name: string // * String is mapped to varchar(255) by default

    @Column({length: 100})
    lastname: string

    @Column()
    birthDate: Date

    @Column({length: 80})
    nationality: string

    @Column("text")
    biography: string
}