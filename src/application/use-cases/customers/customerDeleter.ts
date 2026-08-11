import { CustomerRepositoryInterface } from "../../../domain/repositories/customerRepository.interface";

export class CustomerDeleter {

    private repository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface) {
        this.repository = repository;
    }

    async run(id: number): Promise<void> {
       let result = await this.repository.findById(id);
        if(result === null) {
            throw new Error(`Customer with id ${id} not found`);
        }
        await this.repository.delete(id);
    }
}