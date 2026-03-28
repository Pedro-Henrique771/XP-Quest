import express from "express";
import routes from "./routes/index.js";
import auth from "./routes/authRoutes.js";
import activity from "./routes/activitiesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(auth);
app.use(activity);
app.use(userRoutes);

routes(app);

export default app;