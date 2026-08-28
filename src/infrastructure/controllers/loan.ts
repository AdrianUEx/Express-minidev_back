// * Method list to intercept requests oriented to Loan entity management
import { Request, Response } from "express";
import { TypeORMLoan } from "../entities/typeOrmLoan";
import { LoanState } from "../../domain/models/loan";
import { LoanCreator } from "../../application/use-cases/loans/loanCreator";
import { LoanRepository } from "../repositories/typeorm/loanRepository";
import { LoanSearcher } from "../../application/use-cases/loans/loanSearcher";
import { LoanFinder } from "../../application/use-cases/loans/loanFinder";
import { LoanUpdater } from "../../application/use-cases/loans/loanUpdater";
import { LoanDeleter } from "../../application/use-cases/loans/loanDeleter";

const loanRepository: LoanRepository = new LoanRepository();

export async function getLoans(req: Request, res: Response) {
  let loanList: TypeORMLoan[] = [];
  const useCase = new LoanSearcher(loanRepository);

  //loanList = await loanRepository.find();

  loanList = await useCase.run();
  res.status(200).send({ loanList });
}

export async function getLoan(req: Request, res: Response) {
  let loan: TypeORMLoan | null = null;
  const useCase = new LoanFinder(loanRepository);

  const loanId = req.params.id;
  //loan = await loanRepository.findOneBy({ id: Number.parseInt(loanId) }); // * Supposing id comes from frontend somehow. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.

  loan = await useCase.run(Number.parseInt(loanId));

  res.status(200).send({ loan });
}

// ? Review logic
export async function createLoan(req: Request, res: Response) {
  const newLoan: TypeORMLoan = req.body; // * This is the JSON of a new Loan coming from a form or similar.
  const useCase = new LoanCreator(loanRepository);

  console.log(req.body);

  //await loanRepository.insert(newLoan); // .save() can also be used instead of .insert(), but .insert() is more specialized

  await useCase.run(newLoan);
  res.status(201).send("Loan inserted successfully");
}

// ! Falla por algo de TypeORM. Es como si estuviese leyendo una relación mal, ya que el nombre de loanId no se encuentra en ninguna Entity ni tabla ni modelo de datos de dominio en este momento.
export async function updateLoan(req: Request, res: Response) {
  let loan = req.body;
  const useCase = new LoanUpdater(loanRepository);

  //loan = await loanRepository.update(req.params.id, loan);
  await useCase.run(Number.parseInt(req.params.id), loan);

  res.status(200).send(`Loan updated successfully`);
}

export async function deleteLoan(req: Request, res: Response) {
  const loanId = req.params.id;
  const useCase = new LoanDeleter(loanRepository);

  // await loanRepository.delete(loanId);
  await useCase.run(Number.parseInt(loanId));

  res.status(200).send("Loan deleted successfully");
}
