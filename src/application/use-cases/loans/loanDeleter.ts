import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepository.interface";

export class LoanDeleter {

    constructor(private repository: LoanRepositoryInterface) {}

    async run(id: number): Promise<void> {
       let result = await this.repository.findById(id);
        if(result === null) {
            throw new Error(`Loan with id ${id} not found`);
        }
        await this.repository.delete(id);
    }
}