import { AuthorRepository } from "../../repositories/typeorm/authorRepository";
import { BookRepository } from "../../repositories/typeorm/bookRepository";
import { CustomerRepository } from "../../repositories/typeorm/customerRepository";
import { LoanRepository } from "../../repositories/typeorm/loanRepository";

export const authorRepository: AuthorRepository = new AuthorRepository();
export const bookRepository: BookRepository = new BookRepository();
export const customerRepository: CustomerRepository = new CustomerRepository();
export const loanRepository: LoanRepository = new LoanRepository();
