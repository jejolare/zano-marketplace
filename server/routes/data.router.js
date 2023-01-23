import { Router } from "express";
import dataController from "../controllers/data.controller.js";
import middleware from "../middleware/middleware.js";
import upload from '../multer.js';

const dataRouter = Router();
dataRouter.use(["/change-config", "upload-logo", "/reset"], middleware.checkToken);

dataRouter.get("/get-config", dataController.getConfig);
dataRouter.get("/get-logo", dataController.getLogo);
dataRouter.post("/change-config", dataController.changeConfig);
dataRouter.post("/reset", dataController.resetAll);
dataRouter.post("/upload-logo", upload.single("file"), dataController.changeLogo);

export default dataRouter;