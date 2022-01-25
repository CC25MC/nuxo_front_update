import { create } from "axios";

export const request = create({
	baseURL: "http://localhost:9000",
});

export const versionApi = create({
 	baseURL: "https://descargas.nuxo.cl",
});
