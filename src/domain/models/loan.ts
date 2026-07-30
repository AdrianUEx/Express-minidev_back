import { Book } from "../../infrastructure/entities/typeOrmBook";
import { Customer } from "../../infrastructure/entities/typeOrmCustomer";
import { LoanState } from "../../infrastructure/entities/typeOrmLoan";


export class Loan {

  id: number; // * number is mapped by default as integer in the DB.
  book: Book[];
  client: Customer;
  loanDate: Date;
  predictedReturnDate: Date;
  realReturnDate: Date;
  state: LoanState;

}
