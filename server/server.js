import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import authRouter from "./routes/auth.router.js";
import dataRouter from "./routes/data.router.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);

app.use(express.static(path.resolve(__dirname, '../build')));
app.get("/*",function (req, res) {
  res.sendFile(path.resolve(__dirname, "../build/index.html"))
});


app.listen(3019, () => {
    console.log("Server has been started");
});