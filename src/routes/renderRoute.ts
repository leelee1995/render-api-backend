import { Router } from "express";
import axios from "axios";
import { RENDER_TOKEN } from "../constant/envs.js";
import {
	fetchAllRenderServices,
	fetchAllRenderDeploys,
	fetchRenderService,
	fetchRenderDeploys,
} from "../controllers/renderController.js";

const router = Router();

router.get("/services", fetchAllRenderServices);
router.get("/services/:sid", fetchRenderService);
router.get("/services/:sid/deploys/", fetchAllRenderDeploys);
router.get("/services/:sid/deploys/:did", fetchRenderDeploys);

export default router;
