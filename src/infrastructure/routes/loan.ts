// * Interception of requests directed to Loan

import { Router, Request, Response } from "express";
import { createLoan, deleteLoan, getLoan, getLoans, updateLoan } from "../controllers/loan";

export const loanRouter = Router();

loanRouter.get('/', getLoans);
loanRouter.get('/:id', getLoan);

loanRouter.post('/', createLoan);

loanRouter.put('/:id', updateLoan);

loanRouter.delete('/:id', deleteLoan);
