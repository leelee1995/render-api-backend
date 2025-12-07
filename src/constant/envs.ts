const getValue = (key: string) => {
	return process.env[key];
};

export const PORT = getValue("PORT") || 3000;
export const RENDER_TOKEN = getValue("RENDER_TOKEN");
export const MODE = getValue("MODE");
