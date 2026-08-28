import { Book } from "../../../domain/models/book";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepository.interface";

export class BookCreator {

    constructor(private repository: BookRepositoryInterface) {}

    async run(book: Book): Promise<void> {

        // ! this may require modifying the interface to admit a searching operation by multiple parameters, such as title and author id, to avoid duplicates, extend functionality, and give more flexibility to error handling.
       /*  let foundBook = await this.repository.findById(book.isbn);
        if (foundBook) {
            throw new Error(`Book with isbn ${book.isbn} already exists`);
        }
 */
        let result = await this.repository.create(book);
    }
}