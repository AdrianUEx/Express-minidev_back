import * as typeOrmEntities from "../../../entities";

import { AppDataSource } from "../../../persistence/data-source";

export const orm = AppDataSource;

export const ormAuthorRepository = orm.getRepository(typeOrmEntities.TypeORMAuthor);
export const ormBookRepository = orm.getRepository(typeOrmEntities.TypeORMBook);
export const ormCustomerRepository = orm.getRepository(typeOrmEntities.TypeORMCustomer);
export const ormLoanRepository = orm.getRepository(typeOrmEntities.TypeORMLoan);
