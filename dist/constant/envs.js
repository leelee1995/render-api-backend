const getValue = (key) => {
    return process.env[key];
};
export const PORT = getValue("PORT") || 3001;
export const RENDER_TOKEN = getValue("RENDER_TOKEN");
export const MODE = getValue("MODE");
//# sourceMappingURL=envs.js.map