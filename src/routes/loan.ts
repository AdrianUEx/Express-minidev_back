// * Interceptación de rutas dirigidas al Prestamo

import { Router, Request, Response } from "express";
import { createLoan, deleteLoan, getLoan, getLoans, updateLoan } from "../infrastructure/controllers/loan";

export const loanRouter = Router();

loanRouter.get('/', getLoans);
loanRouter.get('/:id', getLoan);

loanRouter.post('/', createLoan);

loanRouter.put('/:id', updateLoan);

loanRouter.delete('/:id', deleteLoan);
