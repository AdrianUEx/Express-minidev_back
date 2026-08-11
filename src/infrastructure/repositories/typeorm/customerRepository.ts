import { Customer } from "../../../domain/models/customer";
import { CustomerRepositoryInterface } from "../../../domain/repositories/customerRepository.interface";
import { TypeORMCustomer } from "../../entities/typeOrmCustomer";
import { AppDataSource } from "../../persistence/data-source";

const orm = AppDataSource;
const ormCustomerRepository = orm.getRepository(TypeORMCustomer);

// * This repository implements the real operations using the ORM. Thus, it follows the implementation of the interface defined in the Domain Layer but retrieves the ORM instance as well as the operations from the ORM's .getRepository() method
export class CustomerRepository implements CustomerRepositoryInterface {
  constructor() {}

  async find(): Promise<Customer[]> {
    let foundCustomers = await ormCustomerRepository.find();

    return foundCustomers.map((current) => {
      let customer: Customer = new Customer();
      customer.id = current.id;
      customer.name = current.name;
      customer.lastname = current.lastname;
      customer.registrationDate = current.registrationDate;
      customer.phone = current.phone;
      return customer;
    });
  }

  async findById(id: number): Promise<Customer | null> {
    const foundCustomer: TypeORMCustomer | null = await ormCustomerRepository.findOneBy({ id: id });
    console.log("Customer encontrado: ", foundCustomer);

    if (foundCustomer) {
      let mappedCustomer: Customer = new Customer();
      mappedCustomer.id = foundCustomer.id;
      mappedCustomer.name = foundCustomer.name;
      mappedCustomer.lastname = foundCustomer.lastname;
      mappedCustomer.registrationDate = foundCustomer.registrationDate;
      mappedCustomer.phone = foundCustomer.phone;

      return mappedCustomer;
    }

    return null;
  }

  async create(customer: Customer): Promise<void> {
    let newCustomer: TypeORMCustomer = new TypeORMCustomer();
    newCustomer.name = customer.name;
    newCustomer.lastname = customer.lastname;
    newCustomer.registrationDate = customer.registrationDate;
    newCustomer.phone = customer.phone;

    const insertResult = await ormCustomerRepository.insert(newCustomer); // .save() can also be used instead of .insert(), but .insert() is more specialized
  }

  async update(requestId: number, customer: Customer): Promise<void> {

    let newCustomer: TypeORMCustomer = new TypeORMCustomer();
    newCustomer.name = customer.name;
    newCustomer.lastname = customer.lastname;
    newCustomer.registrationDate = customer.registrationDate;
    newCustomer.phone = customer.phone;

    const updateResult = await ormCustomerRepository.update(requestId, newCustomer);
  }

  async delete(id: number): Promise<void> {

    const deleteResult = await ormCustomerRepository.delete(id);
  }
}