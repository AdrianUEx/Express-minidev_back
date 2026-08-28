import { Loan } from "../../../domain/models/loan";
import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepository.interface";

export class LoanUpdater {

  constructor(private repository: LoanRepositoryInterface) {}

  async run(loanId: number, loan: Loan): Promise<void> {
    let foundLoan = await this.repository.findById(loanId);
    console.log("Loan encontrado: ", foundLoan);
    if (!foundLoan) {
      throw new Error(`Loan with id ${loanId} not found`);
    }
    await this.repository.update(foundLoan.id, loan); // ! We dont use loanId on this line in order to keep the architecture clean, but I'm not sure if this counts as such.
  }
}