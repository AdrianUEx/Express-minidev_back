import { DataSource } from "typeorm";
import { TypeORMAuthor } from "../../infrastructure/entities/typeOrmAuthor";
import { TypeORMBook } from "../../infrastructure/entities/typeOrmBook";
import { TypeORMCustomer } from "../../infrastructure/entities/typeOrmCustomer";
import { TypeORMLoan } from "../../infrastructure/entities/typeOrmLoan";

// * DataSource is what allows to establish connection with DB. Several can be declared depending on the databases to work with
// * They are always executed by calling initalize() method and connection is hold until destroy() is called.
// * The JSON inside DataSource() are the DataSourceOptions and they vary depending on the specified database in the "type" property in it.
// * In order to use DataSource it must be first invoked in the main file (usually app.js/index.js). Then, you can recover that instance by invoking the .manager() or .getRepository() method 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "devuser",
    password: "password",
    database: "books",
    synchronize: true, // * this property must be false when using migrations to not synchronize schemas automatically
    logging: true,
    entities: [TypeORMAuthor, TypeORMBook, TypeORMCustomer, TypeORMLoan],
    subscribers: [],
    migrations: ["/migrations"], // * This line, along 'synchronize: false', it's the basic setup for migrations


    // optional
   /*  migrationsRun: false, // * specifies whether migrations should run automatically when the application is launched. The default value is false
    migrationsTableName: "migrations", // * name of the table that stores information about executed migrations. The default value is 'false'
    migrationsTransactionMode: "all",  */// * Controls the transaction mode when running migrations. The default value is "all", but other options are "none" and "each".
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

export async function initializeDatabase() {
    try {
        await AppDataSource.initialize()
        console.log("Data Source from TypeORM has been initialized!")
    } catch (error) {
        console.error("Error during Data Source initialization", error)
    }
}