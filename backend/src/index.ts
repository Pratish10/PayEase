import express, {
  Errback,
  Express,
  NextFunction,
  Request,
  Response,
} from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./db";
import router from "./Routes";
import { ErrorResponse } from "./types/error";
import { IGetUserAuthInfoRequest } from "./types/express";
import cors from "cors";
import morgan from "morgan";
import { SuccessResponse } from "./types/success";

const app: Express = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

connectDB();

const port = process.env.PORT || 8000;

app.use("/app/v1", router);

app.use(function (
  err: Errback,
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) {
  const errorResponse: ErrorResponse = {
    success: false,
    error: "Internal Server Error",
    details: ["Internal Server Error"],
  };
  res.json(errorResponse);
});

app.get("/", (req: Request, res: Response) => {
  const successResponse: SuccessResponse<string> = {
    success: true,
    message: "Server is Up and Running",
  };
  res.json(successResponse);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;
