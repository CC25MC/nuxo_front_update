import  { request } from "../base";

const endpoints = {
	create: "/api/tickets",
	view: "/api/tickets/view/",
	allTickets: "/prod/sign-in/api/tickets?limit=100",
};

export const createTicket = async (payload) => {
	const res = await request.post(endpoints.create, payload);
	return res.data;
};

export const viewTicket = async (id) => {
	const res = await request.get(endpoints.view+id);
	return res.data;
};
export const getTicket = async (limit) => {
	const res = await eboletaStatus.get(endpoints.allTickets);
	return res.data;
};