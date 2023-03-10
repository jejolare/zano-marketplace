import { Router } from "express";
import dataController from "../controllers/data.controller.js";
import middleware from "../middleware/middleware.js";
import upload, { pipeImage } from '../multer.js';

const dataRouter = Router();
dataRouter.use(["/change-config", "/upload-logo", "/reset", "/reset-styles", '/hide-offer', '/show-offer', '/export'], middleware.checkToken);

dataRouter.get("/get-config", dataController.getConfig);
dataRouter.get("/get-logo", dataController.getLogo);

dataRouter.post("/json_rpc", dataController.rpcCall);
dataRouter.post("/get-offers", dataController.getOffers);
dataRouter.post("/change-config", dataController.changeConfig);
dataRouter.post("/reset", dataController.resetAll);
dataRouter.post("/reset-styles", dataController.resetStyles);
dataRouter.post("/hide-offer", dataController.hideOffer);
dataRouter.post("/show-offer", dataController.showOffer);
dataRouter.post("/export", dataController.export);
dataRouter.post("/ipfs", pipeImage.single("file"), dataController.uploadIPFS); 
dataRouter.post("/upload-logo", upload.single("file"), dataController.changeLogo);
export default dataRouter;