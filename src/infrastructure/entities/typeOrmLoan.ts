import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TypeORMCustomer } from "./typeOrmCustomer";
import { TypeORMBook } from "./typeOrmBook";
import { LoanState } from "../../domain/models/loan";

@Entity({name: "loan"}) // Database table name. If not specified, the table name will be the same as the class name. If that classname is changed, queries will fail without throwing error, because TypeORM will not find the existing entity by that new name.
export class TypeORMLoan {

  @PrimaryGeneratedColumn() // * Every Entity must have a primary key. Using Generated this key is autoincremented 
  id: number; // * number is mapped by default as integer in the DB.

  @ManyToMany(() => TypeORMBook) // * A Loan can be formed by several books, while a Book can exist in multiple active loans while there is available stock.
  @JoinTable() // * JoinTable() is used only in ManyToMany relations. It's used here in Loan because it holds the ForeignKey
  book: TypeORMBook[];

  @ManyToOne(() => TypeORMCustomer) // * A Customer can have multiple active loans, but every loan can only have a Customer that requested it. ManyToOne con exist without @OneToMany existing on the other table, but not the other way around.
  @JoinColumn() // * The relation id and foreign key are established in Loan because it can't exist without the Client that requested it.
  client: TypeORMCustomer;

  @Column()
  loanDate: Date;

  @Column()
  predictedReturnDate: Date;

  @Column()
  realReturnDate: Date;

  @Column({
    type: "enum",
    enum: LoanState,
    default: LoanState.RETURNED,
  })
  state: LoanState;
}
