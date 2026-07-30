import { Book } from "./book";
import { Customer } from "./customer";


export enum LoanState {
  LOANED = "loaned",
  RETURNED = "returned",
  DELAYED = "delayed",
}

export class Loan {

  id: number; // * number is mapped by default as integer in the DB.
  book: Book[];
  client: Customer;
  loanDate: Date;
  predictedReturnDate: Date;
  realReturnDate: Date;
  state: LoanState;

}
