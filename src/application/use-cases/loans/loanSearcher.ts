import { Loan } from "../../../domain/models/loan";
import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepository.interface";

export class LoanSearcher {
  constructor(private loanRepository: LoanRepositoryInterface) {
    // constructor for dependency injection
    this.loanRepository = loanRepository;
  }

  async run(): Promise<Loan[]> {
    //Use DB operations
    let loansFound = await this.loanRepository.find();
    if (loansFound.length === 0) {
      return [];
    }

    return loansFound;
  }
}
