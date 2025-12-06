import "dotenv/config";
import express from "express";
import cors from "cors";
import { MODE, PORT } from "./constant/envs.js";
import renderRoute from "./routes/renderRoute.js";

const app = express();
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: allowedOrigin, credentials: true, methods: ["GET"] }));
app.use(express.json());
app.use("/api/render", renderRoute);

app.listen(PORT, () => {
	console.log(`\nServer is running on port ${PORT}`);
});
