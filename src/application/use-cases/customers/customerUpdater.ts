import { ExceptionStore } from "../../../domain/exceptions/exceptionStore";
import { Customer } from "../../../domain/models/customer";
import { CustomerRepositoryInterface } from "../../../domain/repositories/customerRepository.interface";

export class CustomerUpdater {

  constructor(private repository: CustomerRepositoryInterface) {}

  async run(customerId: number, customer: Customer): Promise<void> {
    let foundCustomer = await this.repository.findById(customerId);
    if (!foundCustomer) {
      throw new Error(ExceptionStore.EntityNotFoundException);
    }
    await this.repository.update(foundCustomer.id, customer); // ! We dont use customerId on this line in order to keep the architecture clean, but I'm not sure if this counts as such.
  }
}
