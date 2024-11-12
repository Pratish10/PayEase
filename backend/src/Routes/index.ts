import express from "express";
import userRouter from "./userRoutes";
import accountsRouter from "./accountsRoutes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/accounts", accountsRouter);

export default router;
