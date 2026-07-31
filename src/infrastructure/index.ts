import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";

// Infrastructure Layer dependencies
import { initializeDatabase } from "./persistence/data-source";
import { authorRouter } from "../infrastructure/routes/author";
import { bookRouter } from "../infrastructure/routes/book";
import { customerRouter } from "../infrastructure/routes/customer";
import { loanRouter } from "../infrastructure/routes/loan";
import { directUpload, fromRequestUpload } from "../infrastructure/controllers/upload";
// External dependencies
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import multer, { Multer } from "multer";



// * Backend's main file. Every dependency and config is declared here: dependencies, database connection, etc. All that is important.

export const app = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

// ! file upload works perfectly with Authors and Books. Nevertheless, changing the filename to a unique one so it doesn't get overwritten, prevents the name 'file' to be given from request because the most recent file doesn't have the name 'file' anymore, so it wouldn't work.
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (req.query.mode === "csv")
      cb(null, file.fieldname /* + uniqueSuffix */ + ".csv");
    else 
      cb(null, file.fieldname + uniqueSuffix + ".json");
  },
});

const upload: Multer = multer({ storage: storage } /* {dest: 'uploads/'} */); // Needs npm i --save-dev @types/multer

// bodyParser is needed to access the body of the request from a controller. It can parse several formats, but we only need these two.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// * configure CORS
/* app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
}); */
app.use(cors()); // needs npm i --save-dev @types/cors

// * load routers
const customerRoutes = customerRouter;
const authorRoutes = authorRouter;
const bookRoutes = bookRouter;
const loanRoutes = loanRouter;

// * basic routes for asigning the routers
app.use("/customers", customerRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);

// * direct upload with Multer (dependency for 'multipart/form-data').
app.post("/upload", upload.single("file"), directUpload);

// * upload from directory with Multer (dependency for 'multipart/form-data'). I added support for several files with same columns (same content structure)
app.post("/uploads", upload.array("file"), fromRequestUpload);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript server is running");
});

// * Initialization of the database connection using TypeORM. It can be accessed because it belongs to the Domain Layer (an inferior layer)
app.listen(port, async () => {
  await initializeDatabase();
  console.log(`Server listening on http://localhost:${port}`);
});
