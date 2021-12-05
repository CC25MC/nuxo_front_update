import { request } from "../base";

const endpoints = {
    delete: "/api/users/",
    put: "/api/users/",
    get: "/api/users?limit=100",
};

export const deleteUser = async (id) => {
    const res = await request.delete(endpoints.delete + id);
    return res.data;
};

export const putUsers = async (payload) => {
    const res = await request.put(endpoints.put + payload?.id, payload);
    return res.data;
};

export const getUsers = async () => {
    const res = await request.get(endpoints.get);
    return res.data;
};