import { NextFunction, Request, Response } from "express";
import { getToken } from "../utils/getToken";

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await getToken();
    res.locals.token = token;

    next();
  } catch (err) {
    res.status(401).send("Couldn't get authorization code.");
  }
};
