import { Customer } from "../models/customer";


// * This interface is only the contract for the operations allowed to be performed on the Customer.
export interface CustomerRepositoryInterface {

    find(): Customer[];

    findById(id: number): Customer | null;

    create(author: Customer): void;

    update(author: Customer): void;

    delete(id: number): void;
}