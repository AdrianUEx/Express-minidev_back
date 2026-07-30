import { Book } from "../models/book";


// * This interface is only the contract for the operations allowed to be performed on the Book.
export interface BookRepositoryInterface {

    find(): Book[];

    findById(id: number): Book | null;

    create(author: Book): void;

    update(author: Book): void;

    delete(id: number): void;
}