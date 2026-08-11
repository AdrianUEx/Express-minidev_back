import { Customer } from "../models/customer";


// * This interface is only the contract for the operations allowed to be performed on the Customer.
export interface CustomerRepositoryInterface {

    find(): Promise<Customer[]>;

    findById(id: number): Promise<Customer | null>;

    create(customer: Customer): Promise<void>;

    update(requestId: number, customer: Customer): Promise<void>;

    delete(id: number): Promise<void>;
}