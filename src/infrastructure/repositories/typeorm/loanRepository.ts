import { Loan } from "../../../domain/models/loan";
import { LoanRepositoryInterface } from "../../../domain/repositories/loanRepository.interface";
import { TypeORMLoan } from "../../entities/typeOrmLoan";
import { AppDataSource } from "../../persistence/data-source";

const orm = AppDataSource;
const ormLoanRepository = orm.getRepository(TypeORMLoan);

export class LoanRepository implements LoanRepositoryInterface {
  constructor() {}

  async find(): Promise<Loan[]> {
    let foundLoans = await ormLoanRepository.find({
      relations: { book: true,
        client: true
       },
    });

    return foundLoans.map((current) => {
      let newLoan: Loan = new Loan();
      newLoan.id = current.id;
      newLoan.book = current.book;
      newLoan.client = current.client;
      newLoan.loanDate = current.loanDate;
      newLoan.predictedReturnDate = current.predictedReturnDate;
      newLoan.realReturnDate = current.realReturnDate;
      newLoan.state = current.state;

      return newLoan;
    });
  }

  async findById(id: number): Promise<Loan | null> {
    const foundLoan: TypeORMLoan | null = await ormLoanRepository.findOne({
      where: { id: id },
      relations: { book: true,
        client: true
       },
    });
    console.log("Loan encontrado: ", foundLoan);

    if (foundLoan) {
      let mappedLoan: Loan = new Loan();
      mappedLoan.id = foundLoan.id;
      mappedLoan.book = foundLoan.book;
      mappedLoan.client = foundLoan.client;
      mappedLoan.loanDate = foundLoan.loanDate;
      mappedLoan.predictedReturnDate = foundLoan.predictedReturnDate;
      mappedLoan.realReturnDate = foundLoan.realReturnDate;
      mappedLoan.state = foundLoan.state;

      return mappedLoan;
    }

    return null;
  }

  async create(loan: Loan): Promise<void> {
    let newLoan: TypeORMLoan = new TypeORMLoan();
    newLoan.id = loan.id;
    newLoan.book = loan.book;
    newLoan.client = loan.client;
    newLoan.loanDate = loan.loanDate;
    newLoan.predictedReturnDate = loan.predictedReturnDate;
    newLoan.realReturnDate = loan.realReturnDate;
    newLoan.state = loan.state;


    // * SELECT * FROM loans WHERE title = [titulo] AND loan = [id del loan].
    const insertResult = await ormLoanRepository.insert(newLoan); // .save() can also be used instead of .insert(), but .insert() is more specialized
  }

  async update(requestId: number, loan: Loan): Promise<void> {
    let newLoan: TypeORMLoan = new TypeORMLoan();
    newLoan.id = loan.id;
    newLoan.book = loan.book;
    newLoan.client = loan.client;
    newLoan.loanDate = loan.loanDate;
    newLoan.predictedReturnDate = loan.predictedReturnDate;
    newLoan.realReturnDate = loan.realReturnDate;
    newLoan.state = loan.state;

    const updateResult = await ormLoanRepository.update(requestId, newLoan);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await ormLoanRepository.delete(id);
  }
}
