import { Book } from "../../../domain/models/book";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepository.interface";

export class BookFinder {

  constructor(private bookRepository: BookRepositoryInterface) {
    // constructor for dependency injection
    this.bookRepository = bookRepository;
  }

  async run(id: number): Promise<Book | null> {
    //Use DB operations
    let book = await this.bookRepository.findById(id);
    if(book === null) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }

}