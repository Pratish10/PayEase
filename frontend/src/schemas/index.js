import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is Required" }),
  lastName: z.string().min(1, { message: "First Name is Required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is Required" })
    .optional(),
  lastName: z.string().min(1, { message: "Last Name is Required" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
});

export const transferSchema = z.object({
  to: z.string().min(1, { message: "Required user account to send to" }),
  amount: z.number().min(1, { message: "Amount must be at least 1" }),
});
