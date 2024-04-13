import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Connection.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use("/api/user", userRouter);

dotenv.config();
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
