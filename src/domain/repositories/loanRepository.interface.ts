import {Loan} from "../models/loan";


// * This interface is only the contract for the operations allowed to be performed on the Loan.
export interface LoanRepositoryInterface {

    find(): Loan[];

    findById(id: number): Loan | null;

    create(author: Loan): void;

    update(author: Loan): void;

    delete(id: number): void;
}