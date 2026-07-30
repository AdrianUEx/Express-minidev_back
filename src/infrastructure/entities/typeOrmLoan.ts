import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./typeOrmCustomer";
import { Book } from "./typeOrmBook";

export enum LoanState {
  LOANED = "loaned",
  RETURNED = "returned",
  DELAYED = "delayed",
}

@Entity()
export class TypeORMLoan {

  @PrimaryGeneratedColumn() // * Every Entity must have a primary key. Using Generated this key is autoincremented 
  id: number; // * number is mapped by default as integer in the DB.

  @ManyToMany(() => Book) // * A Loan can be formed by several books, while a Book can exist in multiple active loans while there is available stock.
  @JoinTable() // * JoinTable() is used only in ManyToMany relations. It's used here in Loan because it holds the ForeignKey
  book: Book[];

  @ManyToOne(() => Customer) // * A Customer can have multiple active loans, but every loan can only have a Customer that requested it. ManyToOne con exist without @OneToMany existing on the other table, but not the other way around.
  @JoinColumn() // * The relation id and foreign key are established in Loan because it can't exist without the Client that requested it.
  client: Customer;

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
