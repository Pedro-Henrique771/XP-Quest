import express from "express";
import activitiesController from "../controllers/ActivitiesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.post("/activities", authMiddleware, activitiesController.descriptionTaken);
routes.get("/activities/history", authMiddleware, activitiesController.getHistory);


export default routes;