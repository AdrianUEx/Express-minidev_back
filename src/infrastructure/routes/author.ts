// * Interception of requests directed to Author

import { Router } from "express";
import { deleteAuthor, getAuthor, getAuthors, signUpAuthor, updateAuthor } from "../controllers/author";

export const authorRouter = Router();

authorRouter.get('/', getAuthors);
authorRouter.get('/:id', getAuthor);

authorRouter.post('/', signUpAuthor);

authorRouter.put('/:id', updateAuthor);

authorRouter.delete('/:id', deleteAuthor);
