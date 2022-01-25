import { versionApi } from "../../api";
import { useMutation, useQuery } from 'react-query';


const getVersion = () => {
    const { isLoading, data, error } = useQuery(
        "/version",
        () => versionApi.version.getVersions()
    );
    return {
        isLoading,
        version: data || [],
        error,
    };
}

export {
    getVersion
};