import { Book } from "../../../domain/models/book";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepository.interface";
import { TypeORMAuthor } from "../../entities/typeOrmAuthor";
import { TypeORMBook } from "../../entities/typeOrmBook";
import { AppDataSource } from "../../persistence/data-source";

const orm = AppDataSource;
const ormBookRepository = orm.getRepository(TypeORMBook);

export class BookRepository implements BookRepositoryInterface {
  constructor() {}

  async find(): Promise<Book[]> {
    let foundBooks = await ormBookRepository.find({
      relations: { author: true },
    });

    return foundBooks.map((current) => {
      let newBook: Book = new Book();
      newBook.isbn = current.isbn;
      newBook.title = current.title;
      newBook.genre = current.genre;
      newBook.description = current.description;
      newBook.publishDate = current.publishDate;
      newBook.stock = current.stock;
      newBook.author = current.author;
      return newBook;
    });
  }

  async findById(id: number): Promise<Book | null> {
    const foundBook: TypeORMBook | null = await ormBookRepository.findOne({
      where: { isbn: id },
      relations: { author: true },
    });
    console.log("Book encontrado: ", foundBook);

    if (foundBook) {
      let mappedBook: Book = new Book();
      mappedBook.isbn = foundBook.isbn;
      mappedBook.title = foundBook.title;
      mappedBook.genre = foundBook.genre;
      mappedBook.description = foundBook.description;
      mappedBook.publishDate = foundBook.publishDate;
      mappedBook.stock = foundBook.stock;
      mappedBook.author = foundBook.author;
      return mappedBook;
    }

    return null;
  }

  async create(book: Book): Promise<void> {
    let newBook: TypeORMBook = new TypeORMBook();
    newBook.isbn = book.isbn;
    newBook.title = book.title;
    newBook.genre = book.genre;
    newBook.description = book.description;
    newBook.publishDate = book.publishDate;
    newBook.stock = book.stock;
    newBook.author = book.author;


  // * SELECT * FROM books WHERE title = [titulo] AND author = [id del autor]. 
    const insertResult = await ormBookRepository.insert(newBook); // .save() can also be used instead of .insert(), but .insert() is more specialized
  }

  async update(requestId: number, book: Book): Promise<void> {
     let newBook: TypeORMBook = new TypeORMBook();
        newBook.isbn = book.isbn;
        newBook.title = book.title;
        newBook.genre = book.genre;
        newBook.description = book.description;
        newBook.publishDate = book.publishDate;
        newBook.stock = book.stock;
        newBook.author = book.author;
    
        const updateResult = await ormBookRepository.update(requestId, newBook);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await ormBookRepository.delete(id);

  }
}
