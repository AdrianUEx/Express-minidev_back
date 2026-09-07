import { ExceptionStore } from "../../../domain/exceptions/exceptionStore";
import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepository.interface";

export class LoanDeleter {

    constructor(private repository: LoanRepositoryInterface) {}

    async run(id: number): Promise<void> {
       let result = await this.repository.findById(id);
        if(result === null) {
            throw new Error(ExceptionStore.EntityNotFoundException);
        }
        await this.repository.delete(id);
    }
}