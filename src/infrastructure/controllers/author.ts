// * Method list to intercept requests oriented to Author entity management

import { Request, Response } from "express";
import { AppDataSource } from "../../domain/data-source";
import { Author } from "../entities/author";
import { InsertResult, UpdateResult } from "typeorm";
import { AuthorDTO } from "../../application/models/author.interface";

const orm = AppDataSource;
const authorRepository = orm.getRepository(Author);

export async function getAuthors(req: Request, res: Response) {
  let authorList: AuthorDTO[] = [];

  try {
    authorList = await authorRepository.find();
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
  let author: AuthorDTO | null = null;

  try {
    const authorId = req.params.id; // '.params' returns string values
    console.log(authorId);

    author = await authorRepository.findOneBy({ id: Number.parseInt(authorId) }); // * Supposing id comes from frontend in the URL. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.

    console.log(author);

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
  const newAuthor: AuthorDTO = req.body; // * This is the JSON of a new Author coming from a form or similar.

  /*   newAuthor.name = req.body.name;
  newAuthor.lastname = req.body.lastname;
  newAuthor.birthDate = req.body.birthDate;
  newAuthor.nationality = req.body.nationality;
  newAuthor.biography = req.body.biography; */

  let result: InsertResult = new InsertResult();
  try {
    result = await authorRepository.insert(newAuthor); // .save() can also be used instead of .insert(), but .insert() is more specialized
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
  const author: AuthorDTO = req.body; // What it is received from the frontend to send to the DB

  try {
    const authorResult: UpdateResult = await authorRepository.update(
      req.params.id,
      author,
    );
    res.status(200).send(`Author updated successfully: ${authorResult}`);
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

  try {
    const deleteResult = await authorRepository.delete(authorId); // ? I've tested with Postman that this deletes even if it doesnt use a number
    res.status(200).send(`Author deleted successfully: ${deleteResult}`);
  } catch (err) {
    if (!authorId) {
      res.status(400).send("Bad Request from the client");
    } else {
      res.status(404).send("Author not found for deleting");
    }
  }
}
