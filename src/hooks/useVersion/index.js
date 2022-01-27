import { versionApi, request } from "../../api";
import { useMutation, useQuery } from 'react-query';


const getVersion = () => {
    const { isLoading, data, error } = useQuery(
        "/versionlast",
        () => versionApi.version.getVersions()
        // ,
        // {
        //     refetchInterval: 3000,
        // }
    );
    return {
        isLoading,
        version: data || [],
        error,
    };
}

const getActualVersion = () => {
    const { isLoading, data, error } = useQuery(
        "/api",
        () => request.user.getVersions()
    );
    return {
        isLoading,
        actual: data || [],
        error,
    };
}

export {
    getActualVersion,
    getVersion
};