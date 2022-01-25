import { request } from "../base";

export const post = async (payload) => {
	const res = await request.post("/api/licencia", payload);
	return res.data;
};

export const deleteLicence = async () => {
    const res = await request.delete("/api/licencia");
    return res.data;
};

export const get = async () => {
    const res = await request.get("/api/licencia");
    return res.data;
};