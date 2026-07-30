import { Author } from "../models/author";


// * This interface is only the contract for the operations allowed to be performed on the Author.
export interface AuthorRepositoryInterface {

    find(): Author[];

    findById(id: number): Author | null;

    create(author: Author): void;

    update(author: Author): void;

    delete(id: number): void;
}