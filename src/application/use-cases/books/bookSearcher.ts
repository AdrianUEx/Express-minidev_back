import { Book } from "../../../domain/models/book";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepository.interface";

export class BookSearcher {
  constructor(private bookRepository: BookRepositoryInterface) {
    // constructor for dependency injection
    this.bookRepository = bookRepository;
  }

  async run(): Promise<Book[]> {
    //Use DB operations
    let booksFound = await this.bookRepository.find();
    if (booksFound.length === 0) {
      return [];
    }

    return booksFound;
  }
}
