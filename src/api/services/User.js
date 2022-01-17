import { request } from "../base";

const endpoints = {
    signUp: "/api/user",
};

export const signUp = async (payload) => {
	const res = await request.post(endpoints.signUp, payload);
	return res.data;
};

export const deleteUser = async () => {
    const res = await request.delete(endpoints.signUp);
    return res.data;
};

export const putUsers = async () => {
    const res = await request.put(endpoints.signUp);
    return res.data;
};

export const getUsers = async () => {
    const res = await request.get(endpoints.signUp);
    return res.data;
};