// * Method list to intercept requests oriented to Book entity management
import { Request, Response } from "express";
import { TypeORMBook } from "../entities/typeOrmBook";
import { InsertResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { BookRepository } from "../repositories/typeorm/bookRepository";
import { BookFinder } from "../../application/use-cases/books/bookFinder";
import { BookSearcher } from "../../application/use-cases/books/bookSearcher";
import { BookCreator } from "../../application/use-cases/books/bookCreator";
import { BookUpdater } from "../../application/use-cases/books/bookUpdater";
import { BookDeleter } from "../../application/use-cases/books/bookDeleter";

const bookRepository: BookRepository = new BookRepository();

export async function getBooks(req: Request, res: Response) {
  let bookList: TypeORMBook[] = [];
  const useCase = new BookSearcher(bookRepository);

  //bookList = await bookRepository.find();
  bookList = await useCase.run();

  res.status(200).send({ bookList });
}

export async function getBook(req: Request, res: Response) {
  let book: TypeORMBook | null = null;
  const useCase = new BookFinder(bookRepository);

  const bookId: string = req.params.id;

  //book = await bookRepository.findOneBy({ isbn: Number.parseInt(bookId) }); // * Supposing id comes from frontend somehow. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.
  book = await useCase.run(Number.parseInt(bookId));

  res.status(200).send({ book });
}

export async function registerBook(req: Request, res: Response) {
  const newBook: TypeORMBook = req.body; // * This is the JSON of a new Book coming from a form or similar.
  console.log("Incoming book: ", newBook);

  let result: InsertResult = new InsertResult();
  const useCase = new BookCreator(bookRepository);

  // ! insert() inserts infinitely asigning a new id instead of checking first if it already exists. Maybe we should make the title a composite PK along with the id or mark both with UNIQUE using @Unique({[... , ...]}).
  //result = await bookRepository.insert(newBook);
  await useCase.run(newBook);

  res.status(201).send("Book inserted successfully");
}

export async function updateBook(req: Request, res: Response) {
  const book: TypeORMBook = req.body;
  const useCase = new BookUpdater(bookRepository);
  /*     const bookResult: UpdateResult = await bookRepository.update(
      req.params.id,
      book,
    ); */
  await useCase.run(Number.parseInt(req.params.id), book);

  res.status(200).send(`Book updated successfully`);
}

export async function deleteBook(req: Request, res: Response) {
  const bookId: string = req.params.id; // '.params' return string values
  const useCase = new BookDeleter(bookRepository);

  //await bookRepository.delete(bookId);
  await useCase.run(Number.parseInt(bookId));

  res.status(200).send("Book deleted successfully");
}
