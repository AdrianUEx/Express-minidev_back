import { ExceptionStore } from "../../../domain/exceptions/exceptionStore";
import { CustomerRepositoryInterface } from "../../../domain/repositories/customerRepository.interface";

export class CustomerDeleter {

    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
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