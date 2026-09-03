import { TypeORMAuthor } from "../../../entities/typeOrmAuthor";
import { TypeORMBook } from "../../../entities/typeOrmBook";
import { TypeORMCustomer } from "../../../entities/typeOrmCustomer";
import { TypeORMLoan } from "../../../entities/typeOrmLoan";
import { AppDataSource } from "../../../persistence/data-source";

export const orm = AppDataSource;

export const ormAuthorRepository = orm.getRepository(TypeORMAuthor);
export const ormBookRepository = orm.getRepository(TypeORMBook);
export const ormCustomerRepository = orm.getRepository(TypeORMCustomer);
export const ormLoanRepository = orm.getRepository(TypeORMLoan);
