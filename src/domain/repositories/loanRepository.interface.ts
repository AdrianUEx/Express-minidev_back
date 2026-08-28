import {Loan} from "../models/loan";


// * This interface is only the contract for the operations allowed to be performed on the Loan.
export interface LoanRepositoryInterface {

    find(): Promise<Loan[]>;

    findById(id: number): Promise<Loan | null>;

    create(author: Loan): Promise<void>;

    update(requestId: number, loan: Loan): Promise<void>;

    delete(id: number): Promise<void>;
}