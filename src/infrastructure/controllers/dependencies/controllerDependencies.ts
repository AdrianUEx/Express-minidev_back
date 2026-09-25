// Using Barrel Pattern from /repositories/typeorm
import * as typeOrmRepositories from "../../repositories/typeorm"

export const authorRepository: typeOrmRepositories.AuthorRepository = new typeOrmRepositories.AuthorRepository();
export const bookRepository: typeOrmRepositories.BookRepository = new typeOrmRepositories.BookRepository();
export const customerRepository: typeOrmRepositories.CustomerRepository = new typeOrmRepositories.CustomerRepository();
export const loanRepository: typeOrmRepositories.LoanRepository = new typeOrmRepositories.LoanRepository();
