// * Method list to intercept requests oriented toTypeORMAuthorentity management

import { Request, Response } from "express";
import { AppDataSource } from "../../infrastructure/persistence/data-source";
import { TypeORMAuthor } from "../entities/typeOrmAuthor";
import { InsertResult, UpdateResult } from "typeorm";
import { AuthorDeleter } from "../../application/use-cases/authors/authorDeleter";
import { AuthorRepository } from "../repositories/typeorm/authorRepository";
import { AuthorSearcher } from "../../application/use-cases/authors/authorSearcher";
import { AuthorFinder } from "../../application/use-cases/authors/authorFinder";
import { AuthorCreator } from "../../application/use-cases/authors/authorCreator";
import { AuthorUpdater } from "../../application/use-cases/authors/authorUpdater";

//const orm = AppDataSource;
//const authorRepository = orm.getRepository(TypeORMAuthor);
const authorRepository: AuthorRepository = new AuthorRepository();

export async function getAuthors(req: Request, res: Response) {
  let authorList: TypeORMAuthor[] = [];
  const useCase = new AuthorSearcher(authorRepository);

  // authorList = await authorRepository.find();
  authorList = await useCase.run();

  res.status(200).send({ authorList });
}

export async function getAuthor(req: Request, res: Response) {
  let author: TypeORMAuthor | null = null;
  const authorId: string = req.params.id; // '.params' returns string values
  console.log("Id de parámetros: ", authorId);

  /*     author = await authorRepository.findOneBy({
      id: Number.parseInt(authorId),
    }); */ // * Supposing id comes from frontend in the URL. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.
  const useCase = new AuthorFinder(authorRepository);
  author = await useCase.run(Number.parseInt(authorId));

  res.status(200).send({ author });
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
  //result = await authorRepository.insert(newAuthor); // .save() can also be used instead of .insert(), but .insert() is more specialized
  //await authorRepository.create(newAuthor);

  const useCase = new AuthorCreator(authorRepository);
  useCase.run(newAuthor);

  res.status(201).send("Author inserted successfully");
}

export async function updateAuthor(req: Request, res: Response) {
  const author: TypeORMAuthor = req.body; // What it is received from the frontend to send to the DB
  const useCase = new AuthorUpdater(authorRepository);

  /*     const authorResult: UpdateResult = await authorRepository.update(
      req.params.id,
      author,
    ); */

  await useCase.run(Number.parseInt(req.params.id), author); // Here it can't be only the author because that would mean that the client has COMPLETE information about the author and can modify it, so the id must come from a separate source.

  res.status(200).send("Author updated successfully");
}

export async function deleteAuthor(req: Request, res: Response) {
  const authorId: string = req.params.id; // '.params' returns string values
  const useCase: AuthorDeleter = new AuthorDeleter(authorRepository);

  await useCase.run(Number.parseInt(authorId)); // * This is the use case that will delete the author with the given id. It will throw an error if the author is not found.
  res.status(204).send("Author deleted successfully");
}
