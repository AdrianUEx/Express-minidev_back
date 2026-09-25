// * Method list to intercept requests oriented to TypeORMLoan entity management
import { Request, Response } from "express";
import { TypeORMLoan } from "../entities/typeOrmLoan";

import * as loanUseCases from "../../application/use-cases/loans";

import { loanRepository } from "./dependencies/controllerDependencies";



export async function getLoans(req: Request, res: Response) {
  let loanList: TypeORMLoan[] = [];
  const useCase = new loanUseCases.LoanSearcher(loanRepository);

  //loanList = await loanRepository.find();

  loanList = await useCase.run();
  res.status(200).send({ loanList });
}

export async function getLoan(req: Request, res: Response) {
  let loan: TypeORMLoan | null = null;
  const useCase = new loanUseCases.LoanFinder(loanRepository);

  const loanId = req.params.id;
  //loan = await loanRepository.findOneBy({ id: Number.parseInt(loanId) }); // * Supposing id comes from frontend somehow. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.

  loan = await useCase.run(Number.parseInt(loanId));

  res.status(200).send({ loan });
}

// ? Review logic
export async function createLoan(req: Request, res: Response) {
  const newLoan: TypeORMLoan = req.body; // * This is the JSON of a new Loan coming from a form or similar.
  const useCase = new loanUseCases.LoanCreator(loanRepository);

  console.log(req.body);

  //await loanRepository.insert(newLoan); // .save() can also be used instead of .insert(), but .insert() is more specialized

  await useCase.run(newLoan);
  res.status(201).send("Loan inserted successfully");
}

// ! Falla por algo de TypeORM. Es como si estuviese leyendo una relación mal, ya que el nombre de loanId no se encuentra en ninguna Entity ni tabla ni modelo de datos de dominio en este momento.
export async function updateLoan(req: Request, res: Response) {
  let loan = req.body;
  const useCase = new loanUseCases.LoanUpdater(loanRepository);

  //loan = await loanRepository.update(req.params.id, loan);
  await useCase.run(Number.parseInt(req.params.id), loan);

  res.status(200).send(`Loan updated successfully`);
}

export async function deleteLoan(req: Request, res: Response) {
  const loanId = req.params.id;
  const useCase = new loanUseCases.LoanDeleter(loanRepository);

  // await loanRepository.delete(loanId);
  await useCase.run(Number.parseInt(loanId));

  res.status(200).send("Loan deleted successfully");
}
