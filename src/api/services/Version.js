import { versionApi } from "../base";

export const getVersions = async () => {
    const res = await versionApi.get("/versionlast");
    return res.data;
};