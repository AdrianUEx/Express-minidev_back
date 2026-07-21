// * Interceptación de rutas dirigidas al Libro

import { Router, Request, Response } from "express";
import { deleteBook, getBook, getBooks, registerBook, updateBook } from "../infrastructure/controllers/book";

export const bookRouter = Router();

bookRouter.get('/', getBooks);
bookRouter.get('/:id', getBook);

bookRouter.post('/', registerBook);

bookRouter.put('/:id', updateBook);

bookRouter.delete('/:id', deleteBook);