import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";


// Infrastructure Layer dependencies
import * as controllerRoutes from "./routes";
import { initializeDatabase } from "./persistence/data-source";
import { fromRequestUpload, uploadManager } from "../infrastructure/controllers/upload";

// External dependencies
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import multer, { Multer } from "multer";
import helmet from "helmet";


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

// implement Helmet to add several headers to the responses for security purposes
app.use(helmet());

// * load routers
const customerRoutes = controllerRoutes.customerRouter;
const authorRoutes = controllerRoutes.authorRouter;
const bookRoutes = controllerRoutes.bookRouter;
const loanRoutes = controllerRoutes.loanRouter;

// * basic routes for asigning the routers
app.use("/customers", customerRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);

// * upload with Multer (dependency for 'multipart/form-data').
app.post(["/upload", "/uploads"], upload.single("file"), uploadManager);

// * upload from directory with Multer (dependency for 'multipart/form-data'). I added support for several files with same columns (same content structure), but it was only necessary to upload one from the request.
// ! Uncomment this line if necessary to upload several files with same columns (same content structure) from the request. It would be necessary to change the controller function to handle several files.
//app.post("/uploads", upload.array("file"), fromRequestUpload);

app.get("/", (req: Request, res: Response) => {
  res.send("Express 4.18.2 + TypeScript 5.5.6 server is running");
});

// * Initialization of the database connection using TypeORM. It can be accessed because it belongs to the Domain Layer (an inferior layer)
app.listen(port, async () => {
  await initializeDatabase();
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
