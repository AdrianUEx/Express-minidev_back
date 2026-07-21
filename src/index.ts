import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource, initializeDatabase } from "./data-source";
import { authorRouter } from "./routes/author";
import { bookRouter } from "./routes/book";
import { customerRouter } from "./routes/customer";
import { loanRouter } from "./routes/loan";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import multer, { Multer } from "multer";
import csv from "csv-parser";
import { pipeline, Transform, Writable } from "node:stream";
import fs from "fs";
import { Author } from "./infrastructure/entities/author";
import { AuthorDTO } from "./models/author.interface";
import { BookDTO } from "./models/book.interface";
import { Book } from "./infrastructure/entities/book";
import { InsertResult } from "typeorm";

// * Archivo principal del backend. Aquí se declaran todas las dependencias, la conexión con la base de datos, etc. Todo lo importante.

export const app = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (req.query.modo === "csv")
      cb(null, file.fieldname + uniqueSuffix + ".csv");
    else 
      cb(null, file.fieldname + uniqueSuffix + ".json");
  },
});

const upload: Multer = multer({ storage: storage } /* {dest: 'uploads/'} */); // Needs npm i --save-dev @types/multer

const orm = AppDataSource;
const authorRepository = orm.getRepository(Author);
const bookRepository = orm.getRepository(Book);

// bodyParser is needed to access the body of the request from a controller. It can parse several formats, but we only need these two.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * configure CORS
/* app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Acces-control-Allow-Origin', '*');
  res.header('Acces-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
}); */
app.use(cors()); // needs npm i --save-dev @types/cors

// * load routers
const customerRoutes = customerRouter;
const authorRoutes = authorRouter;
const bookRoutes = bookRouter;
const loanRoutes = loanRouter;

// * basic routes for asigning the routers
app.use("/customers", customerRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);

// * direct upload with Multer (dependency for 'multipart/form-data').
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  // 'file' es lo que sería el valor del atributo "name" del <input>. Dentro de la request con esta codificación, representaría el dato proviniente de dicho <input>, fuera texto (que se puede parsear y desparsear a number) o un archivo.
  const mode = req.query.mode; // req.query es un objeto que tiene una propiedad por cada query parameter existente en la URL. Por este motivo entiendo que solo puede ser string y number
  // En .single() se está recuperando un único fichero de manera directa, el cual está guardado en req.file. Si fuera más de un fichero, no se usaría single() y los ficheros estarían guardados en req.files
  const content = req.query.content;

  console.log(
    `Fichero cargado al directorio. Modo recibido: ${mode}. Tipo de contenido recibido: ${content}. Pasando al pipeline()`,
  );

  // Sacado de la docu oficial
  const transStream = new Transform({
    objectMode: true,
    async transform(chunk, enc, cb) {
      console.log("Este es el chunk: ", chunk);
      let result: InsertResult = new InsertResult();

      try {
        // El QueryParam solo puede ser 'autor' o 'libro' para poder conmutar un TransformStream u otro.
        if (req.query.content === "autor") {
          // cada Chunk es una fila del CSV, pero OJO, 'csv-parser' lo trae como JSON
          result = await authorRepository.upsert(chunk, {
            conflictPaths: ["id"], // deben ser siempre columnas con UNIQUE, UNIQUE INDEX o PRIMARY KEY. Puede establecerse una compuesta con @Unique() a nivel de Entity
            skipUpdateIfNoValuesChanged: true,
          });
        } else {
          // cada Chunk es una fila del CSV, pero OJO, 'csv-parser' lo trae como JSON
          result = await bookRepository.upsert(chunk, {
            conflictPaths: ["isbn"], // deben ser siempre columnas con UNIQUE, UNIQUE INDEX o PRIMARY KEY. Puede establecerse una compuesta con @Unique() a nivel de Entity
            skipUpdateIfNoValuesChanged: true,
          });
        }
        console.log("Resultado de inserción TypeORM: ", result);
      } catch (err) {
        console.log("Fallo al insertar autores masivamente: ", err);
      }

      this.push(chunk.toString()); // pushea el chunk al Readable Stream del Transform Stream. 'csv-parser' envia el chunk como JSON, por lo que el push falla si no se transforma a string ya que fs.createWriteStream() espera recibir strings o Buffer.
      cb();
    },
  });

  pipeline(
    fs.createReadStream("./uploads/file.csv"), // Este archivo se va sobrescribiendo, da igual si es de autores o de libros.
    csv(),
    transStream,
    fs.createWriteStream("/dev/null"), // .createWriteStream() espera recibir string o Buffer.
    (err) => {
      // Esto es lo que se ejecuta después de todo el proceso cuando el stream de escritura se cierra.
      if (err) {
        console.error("Pipeline error:", err.message);
      } else {
        console.log("Fin del pipeline() de carga con ruta directa");
      }

      res.send(
        `Fin de la carga mediante ruta directa. Modo: ${mode}. Contenido: ${content}.`,
      );
    },
  );
});

// * upload from directory with Multer (dependency for 'multipart/form-data').
app.post("/uploads", upload.array("file"), (req: Request, res: Response) => {
  // req.files is array of 'file' files
  const mode = req.query.mode; // req.query es un objeto que tiene una propiedad por cada query parameter existente en la URL. Por este motivo entiendo que solo puede ser string y number
  const ficheroCarga = req.query.ficherocarga;
  const campoFicheroCarga = req.body.fichero;
  
  console.log(
    `Fichero cargado al directorio. Modo recibido: ${mode}. Pasando al pipeline()`,
  );

  // Sacado de la docu oficial
  const transStream = new Transform({
    objectMode: true,
    async transform(chunk, enc, cb) {
      console.log("Este es el chunk: ", chunk);
      let result: InsertResult = new InsertResult();

      try {
        // El QueryParam solo puede ser 'autor' o 'libro' para poder conmutar un TransformStream u otro.
        if (req.query.contenido === "autor") {
          // cada Chunk es una fila del CSV, pero OJO, 'csv-parser' lo trae como JSON
          result = await authorRepository.upsert(chunk, {
            conflictPaths: ["id"], // deben ser siempre columnas con UNIQUE, UNIQUE INDEX o PRIMARY KEY. Puede establecerse una compuesta con @Unique() a nivel de Entity
            skipUpdateIfNoValuesChanged: true,
          });
        } else {
          // cada Chunk es una fila del CSV, pero OJO, 'csv-parser' lo trae como JSON
          result = await bookRepository.upsert(chunk, {
            conflictPaths: ["isbn"], // deben ser siempre columnas con UNIQUE, UNIQUE INDEX o PRIMARY KEY. Puede establecerse una compuesta con @Unique() a nivel de Entity
            skipUpdateIfNoValuesChanged: true,
          });
        }
        console.log("Resultado de inserción TypeORM: ", result);
      } catch (err) {
        console.log("Fallo al insertar autores masivamente: ", err);
      }

      this.push(chunk.toString()); // pushea el chunk al Readable Stream del Transform Stream. 'csv-parser' envia el chunk como JSON, por lo que el push falla si no se transforma a string ya que fs.createWriteStream() espera recibir strings o Buffer.
      cb();
    },
  });

  pipeline(
    fs.createReadStream(`./uploads/${campoFicheroCarga}.${mode}`), // Este archivo se va sobrescribiendo, da igual si es de autores o de libros.
    csv(),
    transStream,
    fs.createWriteStream("/dev/null"), // .createWriteStream() espera recibir string o Buffer.
    (err) => {
      // Esto es lo que se ejecuta después de todo el proceso cuando el stream de escritura se cierra.
      if (err) {
        console.error("Pipeline error:", err.message);
      } else {
        console.log("Fin del pipeline() de carga con ruta desde petición");
      }
    },
  );

  res.send("Fin carga múltiple");
});

app.get("/", (req, res) => {
  res.send("Express + TypeScript server is running");
});

// * Initialization of the database connection using TypeORM
app.listen(port, async () => {
  await initializeDatabase();
  console.log(`Server listening on http://localhost:${port}`);
});
