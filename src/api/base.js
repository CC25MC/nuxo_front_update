import { create } from "axios";
import { getPersistedState } from "../utils";
import { PERSISTOR_KEYS } from "../variables";

const token = getPersistedState(PERSISTOR_KEYS.auth)?.token
export const request = create({
	baseURL: "http://localhost:5000",
	headers: { 'x-token': token }
});

export const eboletaStatus = create({
	baseURL: "https://x78kr8nqx5.execute-api.us-east-1.amazonaws.com",
});
