import { Router } from "express";
import dataController from "../controllers/data.controller.js";
import middleware from "../middleware/middleware.js";

const dataRouter = Router();

dataRouter.use("/change-config", middleware.checkToken);

dataRouter.post("/change-config", dataController.changeConfig);
dataRouter.get("/get-config", dataController.getConfig);

export default dataRouter;