import { Customer } from "../../../domain/models/customer";
import { CustomerRepositoryInterface } from "../../../domain/repositories/customerRepository.interface";

export class CustomerSearcher {
  constructor(private customerRepository: CustomerRepositoryInterface) {
    // constructor for dependency injection
    this.customerRepository = customerRepository;
  }

  async run(): Promise<Customer[]> {
    //Use DB operations
    let customersFound = await this.customerRepository.find();
    if (customersFound.length === 0) {
      return [];
    }
    
    return customersFound;
  }
}
