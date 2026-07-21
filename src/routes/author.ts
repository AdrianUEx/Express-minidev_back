// * Interceptación de rutas dirigidas al Autor

import { Router, Request, Response } from "express";
import { deleteAuthor, getAuthor, getAuthors, signUpAuthor, updateAuthor } from "../infrastructure/controllers/author";

export const authorRouter = Router();

authorRouter.get('/', getAuthors);
authorRouter.get('/:id', getAuthor);

authorRouter.post('/', signUpAuthor);

authorRouter.put('/:id', updateAuthor);

authorRouter.delete('/:id', deleteAuthor);
