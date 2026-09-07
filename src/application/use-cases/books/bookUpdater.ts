import { ExceptionStore } from "../../../domain/exceptions/exceptionStore";
import { Book } from "../../../domain/models/book";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepository.interface";

export class BookUpdater {

  constructor(private repository: BookRepositoryInterface) {}

  async run(bookId: number, book: Book): Promise<void> {
    let foundBook = await this.repository.findById(bookId);
    if (!foundBook) {
      throw new Error(ExceptionStore.EntityNotFoundException);
    }
    await this.repository.update(foundBook.isbn, book); // ! We dont use bookId on this line in order to keep the architecture clean, but I'm not sure if this counts as such.
  }
}