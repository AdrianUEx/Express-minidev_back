import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TypeORMAuthor } from "./typeOrmAuthor"


@Entity({name: "book"}) // Database table name. If not specified, the table name will be the same as the class name. If that classname is changed, queries will fail without throwing error, because TypeORM will not find the existing entity by that new name.
export class TypeORMBook {

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
    
    @ManyToOne(() => TypeORMAuthor)
    @JoinColumn({name: "id"}) // * Where you use JoinColumn, there is registered the relation id and also the foreign key of the relation with the other table, just like in SpringBoot
    author: TypeORMAuthor; // If you try to introduce a new Book in the DB, you can (and should) use the author id. TypeORM will automatically find the author using the @JoinColumn({...}) and TypeORMAuthor Entity within @ManyToOne() Decorator and map it to the BD so it will work seamlessly.
}