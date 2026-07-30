import {Loan} from "../models/loan";


// * This repository can maybe be a single repository for every entity at this moment, but that's not scalable
// * This interface is only the contract for the operations allowed to be performed on the Loan.
export interface LoanRepositoryInterface {

    find(): Loan[];

    findById(id: number):Loan| null;

    create(author: Loan): void;

    update(author: Loan): void;

    delete(id: number): void;
}