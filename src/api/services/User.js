import { request } from "../base";

export const signUp = async (payload) => {
	const res = await request.post("/api/user", payload);
	return res.data;
};

export const deleteUser = async () => {
    const res = await request.delete("/api/user");
    return res.data;
};

export const putUsers = async (payload) => {
    const res = await request.put("/api/user", payload);
    return res.data;
};

export const getUsers = async () => {
    const res = await request.get("/api/user");
    return res.data;
};