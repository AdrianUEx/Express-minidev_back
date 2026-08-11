import { Customer } from "../../../domain/models/customer";
import { CustomerRepositoryInterface } from "../../../domain/repositories/customerRepository.interface";

export class CustomerCreator {

    constructor(private repository: CustomerRepositoryInterface) {}

    async run(customer: Customer): Promise<void> {
        let result = await this.repository.create(customer);
    }
}