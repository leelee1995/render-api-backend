import axios, {} from "axios";
import { RENDER_TOKEN } from "../constant/envs.js";
const render = axios.create({
    baseURL: "https://api.render.com/v1",
    timeout: 8000,
    headers: {
        accept: "application/json",
        authorization: `Bearer ${RENDER_TOKEN}`,
    },
});
export const fetchAllRenderServices = async (_, res) => {
    try {
        const response = await render.get("/services");
        res.json(response.data);
    }
    catch (error) {
        console.error("Render API Error (/services):", error);
        res.status(500).json({
            message: "Failed to fetch services from Render",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
export const fetchRenderService = async (req, res) => {
    try {
        const response = await render.get(`/services/${req.params.sid}`);
        res.json(response.data);
    }
    catch (error) {
        console.error("Render API Error (/services/:sid):", error);
        res.status(500).json({
            message: "Failed to fetch a service from Render",
            error: error instanceof Error ? error.message : "Uknown error",
        });
    }
};
export const fetchAllRenderDeploys = async (req, res) => {
    try {
        const response = await render.get(`services/${req.params.sid}/deploys`);
        res.json(response.data);
    }
    catch (error) {
        console.error("Render API Error (/services/:sid/deploys):", error);
        res.status(500).json({
            message: "Failed to fetch all service's deploys",
            error: error instanceof Error ? error.message : "Uknown error",
        });
    }
};
export const fetchRenderDeploys = async (req, res) => {
    try {
        const response = await render.get(`services/${req.params.sid}/deploys/${req.params.did}`);
        res.json(response.data);
    }
    catch (error) {
        console.error("Render API Error (/services/:sid/deploys/:did):", error);
        res.status(500).json({
            message: "Failed to fetch a service's deploys",
            error: error instanceof Error ? error.message : "Uknown error",
        });
    }
};
//# sourceMappingURL=renderController.js.map