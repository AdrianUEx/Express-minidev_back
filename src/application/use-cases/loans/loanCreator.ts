import { Loan, LoanState } from "../../../domain/models/loan";
import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepository.interface";

export class LoanCreator {
  constructor(private repository: LoanRepositoryInterface) {}

  async run(loan: Loan): Promise<void> {
    // ! this may require modifying the interface to dadmint a searching operation by multiple parameters, such as title and author id, to avoid duplicates, extend functionality, and give more flexibility to error handling.
    /*  let foundLoan = await this.repository.findById(loan.isbn);
        if (foundLoan) {
            throw new Error(`Loan with isbn ${loan.isbn} already exists`);
        }
 */
    if (loan.state === LoanState.LOANED) {
      loan.realReturnDate = new Date(Date.now() + 20 * 86400 * 1000); // Extracted from Mozilla Foundation official docu.
    }
    let result = await this.repository.create(loan);
  }
}
