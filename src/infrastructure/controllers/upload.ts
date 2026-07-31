import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import csv from "csv-parser";
import { pipeline, Transform } from "node:stream";
import fs from "fs";

import { InsertResult } from "typeorm";
import { AppDataSource } from "../../infrastructure/persistence/data-source";
import { TypeORMAuthor } from "../entities/typeOrmAuthor";
import { TypeORMBook } from "../entities/typeOrmBook";


const orm = AppDataSource;
const authorRepository = orm.getRepository(TypeORMAuthor);
const bookRepository = orm.getRepository(TypeORMBook);

export function directUpload(req: Request, res: Response) {
  // 'file' is what would be <input> "name" property value. Inside the request, it would represent the date coming from said <input>, whether it be text (which can be parsed to number) or a file.
  const mode = req.query.mode; // req.query is an object with a property for every QueryParameter existing in URL. That's why I'm guessing it can only be string and number
  // Using .single() we retrieve a single file directly, which es stored in req.file. If it were more than a single file, .single() wounldn't be used and files would be stored in req.files
  const content = req.query.content;

  console.log(
    `File uploaded. Recieved mode: ${mode}. Type of content recieved: ${content}. pipeline() execution up next`,
  );

  // Extracted literally from official docs in 'How to use streams?'
  const transStream = new Transform({
    objectMode: true,
    async transform(chunk, enc, cb) {
      console.log("Current chunk: ", chunk);
      let result: InsertResult = new InsertResult();

      try {
        // This QueryParam can only be 'author' or 'book' to be able to select one Transform stream or the other
        if (content === "author") {
          // every chunk is a row from the CSV, BUT 'csv-parser' delivers it as JSON
          result = await authorRepository.upsert(chunk, {
            conflictPaths: ["id"], // 'conflictPaths' must always be columns with UNIQUE, UNIQUE INDEX or PRIMARY KEY. A composite key can be established using @Unique() at Entity level
            skipUpdateIfNoValuesChanged: true,
          });
        } else {
          // every chunk is a row from the CSV, BUT 'csv-parser' delivers it as JSON
          result = await bookRepository.upsert(chunk, {
            conflictPaths: ["isbn"], // 'conflictPaths' must always be columns with UNIQUE, UNIQUE INDEX or PRIMARY KEY. A composite key can be established using @Unique() at Entity level
            skipUpdateIfNoValuesChanged: true,
          });
        }
        console.log("TypeORM insert result: ", result);
      } catch (err) {
        console.error("Insertion failed: ", err);
      }

      this.push(chunk.toString()); // pushes chunk to the Readable Stream that is inside Transform Stream. 'csv-parser' sends chunk as JSON, so push fails if it's not transformed to string, because fs.createWriteStream() recieves strings or Buffer types.
      cb();
    },
  });

  pipeline(
    fs.createReadStream("./uploads/file.csv"), // This file is overwritten continuously, no matter if it's authors or books
    csv(),
    transStream,
    fs.createWriteStream("/dev/null"), // .createWriteStream() recieves string or Buffer types.
    (err) => {
      // This is executed after Writable stream closes
      if (err) {
        console.error("Pipeline error:", err.message);
      } else {
        console.log("End of upload pipeline() using direct route");
      }

      res.send(
        `Direct route upload finished. Mode: ${mode}. Content: ${content}.`,
      );
    },
  );
}

export function fromRequestUpload(req: Request, res: Response) {
  // req.files is array of 'file' files
  const mode = req.query.mode; // req.query is an object with a property for every QueryParameter existing in URL. That's why I'm guessing it can only be string and number
  const content = req.query.content;

  const uploadFile = req.query.uploadFile;
  const uploadFileField = req.body.uploadFileName;

  console.log(
    `File uploaded. Recieved mode: ${mode}. Type of content recieved: ${content}. pipeline() execution up next`,
  );

  // Extracted literally from official docs in 'How to use streams?'
  const transStream = new Transform({
    objectMode: true,
    async transform(chunk, enc, cb) {
      console.log("Current chunk: ", chunk);
      let result: InsertResult = new InsertResult();

      try {
        // This QueryParam can only be 'author' or 'book' to be able to select one Transform stream or the other
        if (content === "author") {
          // every chunk is a row from the CSV, BUT 'csv-parser' delivers it as JSON
          result = await authorRepository.upsert(chunk, {
            conflictPaths: ["id"], // 'conflictPaths' must always be columns with UNIQUE, UNIQUE INDEX or PRIMARY KEY. A composite key can be established using @Unique() at Entity level
            skipUpdateIfNoValuesChanged: true,
          });
        } else {
          // every chunk is a row from the CSV, BUT 'csv-parser' delivers it as JSON
          result = await bookRepository.upsert(chunk, {
            conflictPaths: ["isbn"], // 'conflictPaths' must always be columns with UNIQUE, UNIQUE INDEX or PRIMARY KEY. A composite key can be established using @Unique() at Entity level
            skipUpdateIfNoValuesChanged: true,
          });
        }
        console.log("TypeORM insert result: ", result);
      } catch (err) {
        console.error("Insert failed: ", err);
      }

      this.push(chunk.toString()); // pushes chunk to the Readable Stream inside Transform Stream. 'csv-parser' sends chunk as JSON, so push fails if it's not transformed to string, because fs.createWriteStream() recieves strings or Buffer types.
      cb();
    },
  });

  pipeline(
    fs.createReadStream(`./uploads/${uploadFileField}.${mode}`), // This file is overwritten continuously, no matter if it's authors or books
    csv(),
    transStream,
    fs.createWriteStream("/dev/null"), // .createWriteStream() recieves string or Buffer types.
    (err) => {
      // This is executed after Writable stream closes
      if (err) {
        console.error("Pipeline error:", err.message);
      } else {
        console.log("End of upload pipeline() using route from request");
      }
    },
  );

  res.send("Upload finished");
}
