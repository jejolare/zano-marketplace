import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import authRouter from "./routes/auth.router.js";
import dataRouter from "./routes/data.router.js";

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);

app.listen(3019, () => {
    console.log("Server has been started");
});