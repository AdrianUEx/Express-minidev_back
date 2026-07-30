// * Interception of requests directed to Book

import { Router, Request, Response } from "express";
import { deleteBook, getBook, getBooks, registerBook, updateBook } from "../controllers/book";

export const bookRouter = Router();

bookRouter.get('/', getBooks);
bookRouter.get('/:id', getBook);

bookRouter.post('/', registerBook);

bookRouter.put('/:id', updateBook);

bookRouter.delete('/:id', deleteBook);