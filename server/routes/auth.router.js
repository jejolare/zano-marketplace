import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.use("/change-pass", authController.checkToken);

authRouter.get("/exists", authController.isRegistered);
authRouter.post("/is-admin", (req, res) => authController.checkToken(req, res));
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/change-pass", authController.changePassword);

export default authRouter;
