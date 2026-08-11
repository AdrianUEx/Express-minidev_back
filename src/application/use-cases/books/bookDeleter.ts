import { Book } from "../../../domain/models/book";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepository.interface";

export class BookDeleter {

    constructor(private repository: BookRepositoryInterface) {}

    async run(id: number): Promise<void> {
       let result = await this.repository.findById(id);
        if(result === null) {
            throw new Error(`Book with id ${id} not found`);
        }
        await this.repository.delete(id);
    }
}