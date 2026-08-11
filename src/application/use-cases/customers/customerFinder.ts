import { Customer } from "../../../domain/models/customer";
import { CustomerRepositoryInterface } from "../../../domain/repositories/customerRepository.interface";

// * As a class in the Application Layer, this class can access to its layer and the Domain Layer.
export class CustomerFinder {

  constructor(private customerRepository: CustomerRepositoryInterface) {
    // constructor for dependency injection 
    this.customerRepository = customerRepository;
  }

  async run(id: number): Promise<Customer | null> {
    //Use DB operations
    let customer = await this.customerRepository.findById(id);
    if(customer === null) {
      throw new Error(`Customer with id ${id} not found`);
    }
    return customer;
  }

}
