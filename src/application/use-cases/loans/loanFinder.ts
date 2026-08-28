import { Loan } from "../../../domain/models/loan";
import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepository.interface";

export class LoanFinder {

  constructor(private loanRepository: LoanRepositoryInterface) {
    // constructor for dependency injection
    this.loanRepository = loanRepository;
  }

  async run(id: number): Promise<Loan | null> {
    //Use DB operations
    let loan = await this.loanRepository.findById(id);
    if(loan === null) {
      throw new Error(`Loan with id ${id} not found`);
    }
    return loan;
  }

}