import express from "express";
import authenticator from "../controllers/authController.js";

const routes = express.Router();

routes.get("/users", authenticator.listUsers)
routes.post("/login", authenticator.login);
routes.post("/register", authenticator.register)

export default routes;