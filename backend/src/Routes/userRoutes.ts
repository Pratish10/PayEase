import express, { Response } from "express";
import { loginSchema, signUpSchema, updateUserSchema } from "../schemas";
import { Accounts, User } from "../Models/userSchema";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { ErrorResponse } from "../types/error";
import { SuccessResponse } from "../types/success";
import bcrypt from "bcrypt";
import { authMiddleWare } from "../middleware";
import { IGetUserAuthInfoRequest } from "../types/express";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userData = req.body;
    const validatedFields = signUpSchema.safeParse(userData);

    if (!validatedFields.success) {
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

    const existingUser = await User.findOne({
      email: validatedFields.data.email,
    });
    if (existingUser) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: "User already exists",
        details: ["An account with this email already exists."],
      };
      return res.status(409).json(errorResponse);
    }

    const user = await User.create({
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    await Accounts.create({
      userId: user._id,
      balance: Math.floor(Math.random() * 10001),
    });

    const successResponse: SuccessResponse<string> = {
      success: true,
      data: token,
      message: "User Created Successfully!",
    };

    return res.status(200).json(successResponse);
  },
);

userRouter.post(
  "/login",
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userData = req.body;
    const validatedFields = loginSchema.safeParse(userData);

    if (!validatedFields.success) {
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

    const existingUser = await User.findOne({
      email: validatedFields.data.email,
    });
    if (!existingUser) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: "Not Found",
        details: ["An account with this email was not found."],
      };
      return res.status(404).json(errorResponse);
    }

    const isPasswordCorrect = await bcrypt.compare(
      validatedFields.data.password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: "Invalid Credentials",
        details: ["Invalid Credentials"],
      };
      return res.status(401).json(errorResponse);
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

    const successResponse: SuccessResponse<string> = {
      success: true,
      data: token,
      message: "Login Successfull",
    };

    return res.status(200).json(successResponse);
  },
);

userRouter.put(
  "/",
  authMiddleWare,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userData = req.body;

    const validatedFields = updateUserSchema.safeParse(userData);

    if (!validatedFields.success) {
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

    await User.updateOne({ _id: req.userId }, validatedFields.data);

    const successResponse: SuccessResponse<string> = {
      success: true,
      data: "User Updated Succesfully",
      message: "User Updated Succesfully",
    };

    return res.status(200).json(successResponse);
  },
);

userRouter.get(
  "/bulk",
  authMiddleWare,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstName: { $regex: filter },
        },
        {
          lastName: { $regex: filter },
        },
      ],
    });

    const userResponse = users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
    }));

    const successResponse: SuccessResponse<object[]> = {
      success: true,
      data: userResponse,
      message: "User Updated Succesfully",
    };

    return res.status(200).json(successResponse);
  },
);

userRouter.get(
  "/",
  authMiddleWare,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const userId = req.userId;

    try {
      const user = await User.findOne({
        _id: userId,
      });

      const account = await Accounts.findOne({
        userId: userId,
      });

      if (!user || !account) {
        const errorResponse: ErrorResponse = {
          success: false,
          error: "User or Account not found",
          details: ["User or Account does not exist."],
        };
        return res.status(404).json(errorResponse);
      }

      const successResponse: SuccessResponse<object> = {
        success: true,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          balance: account.balance,
        },
        message: "User and account data fetched successfully",
      };

      return res.status(200).json(successResponse);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: "Internal Server Error",
        details: [(error.message as string) || "Something went wrong."],
      };
      return res.status(500).json(errorResponse);
    }
  },
);

export default userRouter;
