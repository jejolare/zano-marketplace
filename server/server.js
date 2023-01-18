import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import dataRouter from "./routes/data.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);

app.listen(3019, () => {
    console.log("Server has been started");
});