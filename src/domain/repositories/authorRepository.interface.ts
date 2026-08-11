import { Author } from "../models/author";


// * This interface is only the contract for the operations allowed to be performed on the Author.
export interface AuthorRepositoryInterface {

    find(): Promise<Author[]>;

    findById(id: number): Promise<Author | null>;

    create(author: Author): Promise<void>;

    update(requestId: number, author: Author): Promise<void>;

    delete(id: number): Promise<void>;
}