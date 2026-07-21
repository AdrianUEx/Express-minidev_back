import { DataSource } from "typeorm";
import { Author } from "./infrastructure/entities/author";
import { Book } from "./infrastructure/entities/book";
import { Customer } from "./infrastructure/entities/customer";
import { Loan } from "./infrastructure/entities/loan";

// * DataSource es lo que permite establecer la conexión con la base de datos. Se pueden declarar varios dependiendo de las bases de datos con las que trabajar
// * Siempre se ejecutan invocando a initialize() y la conexión se mantiene hasta que se invoca a destroy().
// * El JSON en el interior de DataSource() son las DataSourceOptions y varian depdendiendo de la base de datos especificada en la option "type" de su interior.
// * Para usar el DataSource se invocan los métodos desde los controladores, supuestamente usando .manager() o .getRepository().

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "devuser",
    password: "password",
    database: "books",
    synchronize: true, // * esto tiene que estar a false cuando se usan migraciones para que no se sincronicen los schemas automáticamente
    logging: true,
    entities: [Author, Book, Customer, Loan],
    subscribers: [],
    migrations: ["/migrations"], // * Esta línea junto con 'synchronize: false' es el setup básico para las migraciones


    // optional
   /*  migrationsRun: false, // * indica si las migraciones deberían correrse automáticamente al lanzar la aplicación. Por defecto es false.
    migrationsTableName: "migrations", // * El nombre de la tabla que almacena información sobre las migraciones ejecutadas. Por defecto es "migrations".
    migrationsTransactionMode: "all",  */// * Controla el modo de transaccion cuando se corren migraciones. Por defecto es "all", pero otras opciones son "none" e "each".
})

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

export async function initializeDatabase() {
    try {
        await AppDataSource.initialize()
        console.log("Data Source from TypeORM has been initialized!")
    } catch (error) {
        console.log("Error during Data Source initialization", error)
    }
}