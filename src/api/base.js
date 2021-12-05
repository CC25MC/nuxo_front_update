import { create } from "axios";
import { getPersistedState } from "../utils";
import { PERSISTOR_KEYS } from "../variables";

const token = getPersistedState(PERSISTOR_KEYS.auth)?.token
export const request = create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: { 'x-token': token }
});

export const eboletaStatus = create({
	baseURL: "https://x78kr8nqx5.execute-api.us-east-1.amazonaws.com",
});
