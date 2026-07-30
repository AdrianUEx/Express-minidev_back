// * Method list to intercept requests oriented to Loan entity management
import { Request, Response } from "express";
import { AppDataSource } from "../../domain/data-source";
import { TypeORMLoan, LoanState } from "../entities/typeOrmLoan";

const orm = AppDataSource;
const loanRepository = orm.getRepository(TypeORMLoan);

export async function getLoans(req: Request, res: Response) {
  let loanList: TypeORMLoan[] = [];

  try {
    loanList = await loanRepository.find();
    res.status(200).send({ loanList });
  } catch (err){
    if (loanList.length === 0) {
      res.status(404).send("Loan list not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function getLoan(req: Request, res: Response) {
  let loan: TypeORMLoan | null = null;

  try {
    const loanId = req.params.id;
    loan = await loanRepository.findOneBy({ id: Number.parseInt(loanId) }); // * Supposing id comes from frontend somehow. We use Number.parseInt() instead of .parseInt() because it's more recent, although they are the same.
    res.status(200).send({ loan });
  } catch (err){
    if (!loan) {
      res.status(404).send("Loan not found");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

// ? Revisar lógica
export async function createLoan(req: Request, res: Response) {
  const newLoan: TypeORMLoan = req.body; // * This is the JSON of a new Loan coming from a form or similar.

  if(newLoan.state === LoanState.LOANED) {
    newLoan.realReturnDate = new Date(Date.now() + (20*86400*1000)); // Extracted from Mozilla Foundation official docu.
  }
  console.log(req.body);
  try {
    await loanRepository.insert(newLoan); // .save() can also be used instead of .insert(), but .insert() is more specialized

    res.status(201).send("Loan inserted successfully");
  } catch (err){
    if (!newLoan) {
      res.status(400).send("Loan is null or undefined"); 
    } else {
      res.status(400).send(`Bad Request from the client. ${err}`);
    }
  }
}

export async function updateLoan(req: Request, res: Response) {
  let loan = req.body;

  try {
    loan = await loanRepository.update(req.params.id, loan);
    res.status(200).send(`Loan updated successfully`);
  } catch (err){
    if (!loan) {
      res.status(404).send("Loan not found for updating");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}

export async function deleteLoan(req: Request, res: Response) {
  const loanId = req.params.id;
  try {
    await loanRepository.delete(loanId);
    res.status(200).send("Loan deleted successfully");
  } catch (err){
    if (!loanId) {
      res.status(404).send("Loan not found for deleting");
    } else {
      res.status(400).send("Bad Request from the client");
    }
  }
}
