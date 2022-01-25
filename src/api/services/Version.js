import { versionApi } from "../base";

export const getVersions = async () => {
    const res = await versionApi.get("/version");
    return res.data;
};