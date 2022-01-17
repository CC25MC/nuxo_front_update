import { create } from "axios";

export const request = create({
	baseURL: "http://localhost:9000",
});

// export const eboletaStatus = create({
// 	baseURL: "https://x78kr8nqx5.execute-api.us-east-1.amazonaws.com",
// });
