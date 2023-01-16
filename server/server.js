import express from "express";
import authRouter from "./routes/auth.router.js";
import dataRouter from "./routes/data.router.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/data", dataRouter);

app.listen(3019, () => {
    console.log("Application has been started");
});