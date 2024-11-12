import express, { Response } from "express";
import { Accounts } from "../Models/userSchema";
import { SuccessResponse } from "../types/success";
import { authMiddleWare } from "../middleware";
import { IGetUserAuthInfoRequest } from "../types/express";
import { transferSchema } from "../schemas";
import { ErrorResponse } from "../types/error";
import mongoose from "mongoose";

const accountsRouter = express.Router();

accountsRouter.get(
  "/",
  authMiddleWare,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const account = await Accounts.findOne({
      userId: req.userId,
    });

    const successResponse: SuccessResponse<object> = {
      success: true,
      message: "Fetch Account",
      data: account || {},
    };

    return res.status(201).send(successResponse);
  },
);

accountsRouter.post(
  "/transfer",
  authMiddleWare,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const body = req.body;

    const validatedFields = transferSchema.safeParse(body);

    if (!validatedFields.success) {
      await session.abortTransaction();
      const errorMessages = validatedFields.error.errors.map((err) => {
        if (err.code === "invalid_type" && err.message === "Required") {
          return `${err.path[0]} is a required field.`;
        }

        return err.message;
      });

      const errorResponse: ErrorResponse = {
        success: false,
        error: "Validation failed",
        details: errorMessages,
      };

      return res.status(400).json(errorResponse);
    }

    const account = await Accounts.findOne({ userId: req.userId }).session(
      session,
    );

    if (!account || account.balance < validatedFields.data.amount) {
      await session.abortTransaction();
      const errorResponse: ErrorResponse = {
        success: false,
        error: "InSufficient balance",
        details: ["InSufficient balance"],
      };

      return res.status(400).json(errorResponse);
    }

    const toAccount = await Accounts.findOne({
      userId: validatedFields.data.to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      const errorResponse: ErrorResponse = {
        success: false,
        error: "Invalid account",
        details: ["Invalid account"],
      };

      return res.status(400).json(errorResponse);
    }

    await Accounts.updateOne(
      { userId: req.userId },
      { $inc: { balance: -validatedFields.data.amount } },
    ).session(session);
    await Accounts.updateOne(
      { userId: validatedFields.data.to },
      { $inc: { balance: validatedFields.data.amount } },
    ).session(session);

    await session.commitTransaction();

    const successResponse: SuccessResponse<string> = {
      success: true,
      message: "Transfer successful",
    };

    return res.status(201).send(successResponse);
  },
);

export default accountsRouter;
