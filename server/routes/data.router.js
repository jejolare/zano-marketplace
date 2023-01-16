import { Router } from "express";
import dataController from "../controllers/data.controller.js";

const dataRouter = Router();

dataRouter.post("/change-config", dataController.changeConfig);
dataRouter.get("/get-config", dataController.getConfig);

export default dataRouter;