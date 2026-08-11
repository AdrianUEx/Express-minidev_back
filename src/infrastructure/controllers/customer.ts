// * Method list to intercept requests oriented toTypeORMCustomerentity management
import { Request, Response } from "express";
import { TypeORMCustomer } from "../entities/typeOrmCustomer";
import { AppDataSource } from "../persistence/data-source";
import { InsertResult } from "typeorm";
import { CustomerRepository } from "../repositories/typeorm/customerRepository";
import { CustomerFinder } from "../../application/use-cases/customers/customerFinder";
import { CustomerSearcher } from "../../application/use-cases/customers/customerSearcher";
import { CustomerCreator } from "../../application/use-cases/customers/customerCreator";
import { CustomerUpdater } from "../../application/use-cases/customers/customerUpdater";
import { CustomerDeleter } from "../../application/use-cases/customers/customerDeleter";

const customerRepository: CustomerRepository = new CustomerRepository();

export async function getCustomers(req: Request, res: Response) {
  let customerList: TypeORMCustomer[] = [];
  const useCase = new CustomerSearcher(customerRepository);

  // customerList = await customerRepository.find(); // * .find() without arguments executes a SELECT * FROM "Customer"; query, whereTypeORMCustomeris the database table
  customerList = await useCase.run();
  res.status(200).send({ customerList });
}

export async function getCustomer(req: Request, res: Response) {
  let customer: TypeORMCustomer | null = null;
  const useCase = new CustomerFinder(customerRepository);

  /*     customer = await customerRepository.findOneBy({
      id: Number.parseInt(req.params.id),
    });  */ // * Supposing id comes from fronted somehow. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.

  customer = await useCase.run(Number.parseInt(req.params.id));

  res.status(200).send({ customer });
}

export async function signUpCustomer(req: Request, res: Response) {
  const useCase = new CustomerCreator(customerRepository);

  const newCustomer: TypeORMCustomer = req.body; // * This is the JSON of a newTypeORMCustomercoming from a form or similar.
  // ! done like this on purpose in case it needs to be changed later.
  newCustomer.name = req.body.name;
  newCustomer.lastname = req.body.lastname;
  newCustomer.phone = req.body.phone;
  newCustomer.registrationDate = req.body.registrationDate;

  // await customerRepository.insert(newCustomer);

  await useCase.run(newCustomer);
  res.status(201).send("Customer inserted successfully");
}

export async function updateCustomer(req: Request, res: Response) {
  let customer = req.body;
  const useCase = new CustomerUpdater(customerRepository);

  //customer = await customerRepository.update(req.params.id, customer);
  await useCase.run(Number.parseInt(req.params.id), customer);
  res.status(200).send(`Customer updated successfully`);
}

export async function deleteCustomer(req: Request, res: Response) {
  const customerId = req.params.id;
  const useCase = new CustomerDeleter(customerRepository);

  // await customerRepository.delete(customerId);

  await useCase.run(Number.parseInt(customerId));
  res.status(200).send("Customer deleted successfully");
}
