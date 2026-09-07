import { ExceptionStore } from "../../../domain/exceptions/exceptionStore";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepository.interface";

export class BookDeleter {

    constructor(private repository: BookRepositoryInterface) {}

    async run(id: number): Promise<void> {
       let result = await this.repository.findById(id);
        if(result === null) {
            throw new Error(ExceptionStore.EntityNotFoundException);
        }
        await this.repository.delete(id);
    }
}