import { NextFunction, Response } from "express";
import { ErrorResponse } from "./types/error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { IGetUserAuthInfoRequest } from "./types/express";

export const authMiddleWare = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: "UNAUTHORIZED",
      details: ["Un Authorized error"],
    };
    return res.status(401).send(errorResponse);
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    req.userId = decoded.userId;

    next();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: error.message as string,
      details: [error.message as string],
    };
    return res.status(401).send(errorResponse);
  }
};
