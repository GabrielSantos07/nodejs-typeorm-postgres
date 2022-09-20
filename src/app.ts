import { AppDataSource } from "./database/data-source";
import { User } from "./entity/User";
import { router } from "./routes";
import { AppError } from "./errors/AppError";
import * as express from 'express';
import { NextFunction, Request, Response } from "express";


AppDataSource.initialize();
const app = express();

app.use(express.json());
app.use(router);
 
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
