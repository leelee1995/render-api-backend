import "dotenv/config";
import express from "express";
import cors from "cors";
import { MODE, PORT } from "./constant/envs.js";
import renderRoute from "./routes/renderRoute.js";

const app = express();

if (MODE !== "production") {
	app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

app.use(express.json());
app.use("/api/render", renderRoute);

app.listen(PORT, () => {
	console.log(`\nServer is running on port ${PORT}`);
});
