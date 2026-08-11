import { Book } from "../models/book";


// * This interface is only the contract for the operations allowed to be performed on the Book.
export interface BookRepositoryInterface {

    find(): Promise<Book[]>;

    findById(id: number): Promise<Book | null>;

    create(author: Book): Promise<void>;

    update(requestId: number, book: Book): Promise<void>;

    delete(id: number): Promise<void>;
}