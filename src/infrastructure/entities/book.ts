import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Author } from "./author"


@Entity()
export class Book {

    @PrimaryGeneratedColumn() // * Every Entity must have a primary key. Using Generated this key is autoincremented 
    isbn: number; // * number is mapped by default as integer in the DB.

    @Column({type: "varchar", length: 80})
    title: string // * String is mapped to varchar(255) by default
    
    @Column()
    publishDate: Date;

    @Column({type: "varchar", length: 30})
    genre: string;

    @Column("text")
    description: string

    @Column()
    stock: number
    
    @ManyToOne(() => Author)
    @JoinColumn({name: "id"}) // * Where you use JoinColumn, there is registered the relation id and also the foreign key of the relation with the other table, just like in SpringBoot
    author: Author;
}