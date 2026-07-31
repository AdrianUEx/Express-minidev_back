// * Method list to intercept requests oriented to Book entity management
import { Request, Response } from "express";
import { AppDataSource } from "../../infrastructure/persistence/data-source";
import { TypeORMBook } from "../entities/typeOrmBook";
import { InsertResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";

const orm = AppDataSource;
const bookRepository = orm.getRepository(TypeORMBook);

export async function getBooks(req: Request, res: Response) {
  let bookList: TypeORMBook[] = [];

  try {
    bookList = await bookRepository.find();
    res.status(200).send({ bookList });
  } catch (err) {
    if (bookList.length === 0) {
      res.status(404).send("Book list not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function getBook(req: Request, res: Response) {
  let book: TypeORMBook | null = null;

  try {
    const bookId: string = req.params.id;
    book = await bookRepository.findOneBy({ isbn: Number.parseInt(bookId) }); // * Supposing id comes from frontend somehow. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.

    res.status(200).send({ book });
  } catch (err) {
    if (!book) {
      res.status(404).send("Book not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function registerBook(req: Request, res: Response) {
  let newBook: TypeORMBook = req.body; // * This is the JSON of a new Book coming from a form or similar.
  console.log(newBook);

  let result: InsertResult = new InsertResult();

  try {
    // * SELECT * FROM books WHERE title = [titulo] AND author = [id del autor]
    const existingBook: TypeORMBook | null = await bookRepository.findOneBy({
      title: newBook.title,
     /*  author: newBook.author.id, */
    });
    console.log(existingBook)
    if (!existingBook) {
      // ! insert() inserta eternamente asignando un nuevo id en lugar de comprobar primero si ya existe. Tal vez habría que hacer que el título fuese PK compuesta junto al id o marcarlos a ambos con UNIQUE usando @Unique({[... , ...]}).
      result = await bookRepository.insert(newBook); // .save() can also be used instead of .insert(), but .insert() is more specialized

      res.status(201).send("Book inserted successfully");
    }else{
      throw Error
    }

  } catch (err) {
    if (!newBook) {
      res.status(404).send("Book not found for inserting");
    } else {
      res.status(400).send(`Bad Request from the client ${err}`);
    }
  }
}

export async function updateBook(req: Request, res: Response) {
  const book: TypeORMBook = req.body; // Without typing to allow object manipulation

  try {
    const bookResult: UpdateResult = await bookRepository.update(req.params.id, book);
    res.status(200).send(`Book updated successfully`);
  } catch (err) {
    if (!book) {
      res.status(404).send("Book not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function deleteBook(req: Request, res: Response) {
  const bookId: string = req.params.id; // '.params' return string values

  try {
    await bookRepository.delete(bookId);
    res.status(200).send("Book deleted successfully");
  } catch (err) {
    if (!bookId) {
      res.status(404).send("Book not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}
