// * Method list to intercept requests oriented to Customer entity management
import { Request, Response } from "express";
import { Customer } from "../entities/typeOrmCustomer";
import { AppDataSource } from "../../domain/data-source";
import { InsertResult } from "typeorm";

const orm = AppDataSource;
const customerRepository = orm.getRepository(Customer);

export async function getCustomers(req: Request, res: Response) {
  let customerList: Customer[] = [];

  try {
    customerList = await customerRepository.find(); // * .find() without arguments executes a SELECT * FROM "Customer"; query, where Customer is the database table

    res.status(200).send({ customerList });
  } catch (err){
    if (customerList.length === 0) {
      res.status(404).send("Customer list not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function getCustomer(req: Request, res: Response) {
  let customer: Customer | null = null;
  try {
    customer = await customerRepository.findOneBy({ id: Number.parseInt(req.params.id) }); // * Supposing id comes from fronted somehow. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.
    res.status(200).send({ customer });
  } catch (err){
    if (!customer) {
      res.status(404).send("Customer not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function signUpCustomer(req: Request, res: Response) {
  const newCustomer = req.body; // * This is the JSON of a new Customer coming from a form or similar.
  // ! done like this on purpose in case it needs to be changed later.
  newCustomer.name = req.body.name;
  newCustomer.lastname = req.body.lastname;
  newCustomer.phone = req.body.phone;
  newCustomer.registrationDate = req.body.registrationDate;

  try {
    await customerRepository.insert(newCustomer); // .save() can also be used instead of .insert(), but .insert() is more specialized

    res.status(201).send("Customer inserted successfully");
  } catch (err) {
    if (!newCustomer) {
      res.status(400).send(`Customer not found. ${err}`);
    } else {
      res.status(404).send(`Bad Request from the client. ${err}`);
    }
  }
}

export async function updateCustomer(req: Request, res: Response) {
  let customer = req.body;

  try {
    customer = await customerRepository.update(req.params.id, customer);
    res.status(200).send(`Customer updated successfully`);
  } catch (err){
    if (!customer) {
      res.status(404).send("Customer not found for updating");
    } else {
      res.status(400).send(`Bad Request from client. ${err}`);
    }
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  const customerId = req.params.id;
  try {
    await customerRepository.delete(customerId);
    res.status(200).send("Customer deleted successfully");
  } catch (err){
    if (!customerId) {
      res.status(400).send("Bad Request from client");
    } else {
      res.status(404).send("Customer not found for deleting");
    }
  }
}
