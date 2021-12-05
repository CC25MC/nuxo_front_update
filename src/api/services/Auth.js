import  { request, eboletaStatus } from "../base";

const endpoints = {
	signIn: "/api/auth/login",
	signUp: "/api/users",
	logout: "/api/auth/logout",
	eboleta: "/prod/sign-in",
};

export const signIn = async (payload) => {
	const res = await request.post(endpoints.signIn, payload);
	return res.data;
};

export const signUp = async (payload) => {
	const res = await request.post(endpoints.signUp, payload);
	return res.data;
};
export const status = async (payload) => {
	const res = await eboletaStatus.post(endpoints.eboleta, payload);
	return res.data;
};

export const logout = async () => {
	const res = await request.get(endpoints.logout);
	return res.data;
};