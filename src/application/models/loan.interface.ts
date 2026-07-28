import { LoanState } from "../../infrastructure/entities/loan";
import { BookDTO } from "./book.interface";
import { CustomerDTO } from "./customer.interface";

export interface LoanDTO {
  id: number; // * number is mapped by default as integer in the DB.
  book: BookDTO[];
  client: CustomerDTO;
  loanDate: Date;
  predictedReturnDate: Date;
  realReturnDate: Date;
  state: LoanState;
}
