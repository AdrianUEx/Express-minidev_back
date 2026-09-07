import { ExceptionStore } from "../../../domain/exceptions/exceptionStore";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

export class AuthorDeleter {

    private repository: AuthorRepositoryInterface;

    constructor(repository: AuthorRepositoryInterface) {
        this.repository = repository;
    }

    async run(id: number): Promise<void> {
       let result = await this.repository.findById(id);
        if(result === null) {
            throw new Error(ExceptionStore.EntityNotFoundException);
        }
        await this.repository.delete(id);
    }
}