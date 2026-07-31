// * Method list to intercept requests oriented toTypeORMAuthorentity management

import { Request, Response } from "express";
import { AppDataSource } from "../../infrastructure/persistence/data-source";
import { TypeORMAuthor } from "../entities/typeOrmAuthor";
import { InsertResult, UpdateResult } from "typeorm";
import { AuthorDeleter } from "../../application/use-cases/authors/authorDeleter";
import { AuthorRepository } from "../repositories/typeorm/authorRepository";
import { AuthorSearcher } from "../../application/use-cases/authors/authorSearcher";
import { AuthorFinder } from "../../application/use-cases/authors/authorFinder";

const orm = AppDataSource;
//const authorRepository = orm.getRepository(TypeORMAuthor);
const authorRepository: AuthorRepository = new AuthorRepository();

export async function getAuthors(req: Request, res: Response) {
  let authorList: TypeORMAuthor[] = [];
  const useCase = new AuthorSearcher(authorRepository);

  try {
    // authorList = await authorRepository.find();
    authorList = await useCase.run();

    res.status(200).send({ authorList });
  } catch (err) {
    if (authorList.length === 0) {
      res.status(404).send("Author list not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function getAuthor(req: Request, res: Response) {
  let author: TypeORMAuthor | null = null;

  try {
    const authorId = req.params.id; // '.params' returns string values
    console.log(authorId);

    /*     author = await authorRepository.findOneBy({
      id: Number.parseInt(authorId),
    }); */ // * Supposing id comes from frontend in the URL. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.
    const useCase = new AuthorFinder(authorRepository);
    author = await useCase.run(Number.parseInt(authorId));

    res.status(200).send({ author });
  } catch (err) {
    if (!author) {
      res.status(404).send("Author not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function signUpAuthor(req: Request, res: Response) {
  const newAuthor: TypeORMAuthor = req.body; // * This is the JSON of a new TypeORMAuthor coming from a form or similar.

  /*   
  newAuthor.name = req.body.name;
  newAuthor.lastname = req.body.lastname;
  newAuthor.birthDate = req.body.birthDate;
  newAuthor.nationality = req.body.nationality;
  newAuthor.biography = req.body.biography; 
  */

  let result: InsertResult = new InsertResult();
  try {
    //result = await authorRepository.insert(newAuthor); // .save() can also be used instead of .insert(), but .insert() is more specialized
    await authorRepository.create(newAuthor);

    res.status(201).send("Author inserted successfully");
  } catch (err) {
    if (!newAuthor) {
      res.status(404).send(`Author not found for inserting ${result}`);
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function updateAuthor(req: Request, res: Response) {
  const author: TypeORMAuthor = req.body; // What it is received from the frontend to send to the DB

  try {
    /*     const authorResult: UpdateResult = await authorRepository.update(
      req.params.id,
      author,
    ); */
    await authorRepository.update(author);

    res.status(200);
  } catch (err) {
    if (!author) {
      res.status(404).send("Author not found for updating");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function deleteAuthor(req: Request, res: Response) {
  const authorId: string = req.params.id; // '.params' returns string values
  const useCase: AuthorDeleter = new AuthorDeleter(authorRepository);

  try {
    await useCase.run(Number.parseInt(authorId)); // * This is the use case that will delete the author with the given id. It will throw an error if the author is not found.
    res.status(204).send();
  } catch (err) {
    if (!authorId) {
      res.status(400).send("Bad Request from the client");
    } else {
      res.status(404).send("Author not found for deleting");
    }
  }
}
