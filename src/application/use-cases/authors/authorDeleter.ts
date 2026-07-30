import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

export class AuthorDeleter {

    private repository: AuthorRepositoryInterface;

    constructor(repository: AuthorRepositoryInterface) {
        this.repository = repository;
    }

    run(id: number): void {
       let result = this.repository.findById(id);
        if(result === null) {
            throw new Error(`Author with id ${id} not found`);
        }
        this.repository.delete(id);
    }
}