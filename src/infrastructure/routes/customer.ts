// * Interception of requests directed to Customer

import { Router } from "express";
import { deleteCustomer, getCustomer, getCustomers, signUpCustomer, updateCustomer } from "../controllers/customer";

export const customerRouter = Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:id', getCustomer);

customerRouter.post('/', signUpCustomer);

customerRouter.put('/:id', updateCustomer);

customerRouter.delete('/:id', deleteCustomer);

