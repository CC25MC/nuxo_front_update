import { request } from "../../api";
import { useMutation, useQuery } from 'react-query';

const getLicence = () => {
    const { isLoading, data, error } = useQuery(
        "/api/licencia",
        () => request.licence.get()
    );
    return {
        isLoading,
        licenceGet: data?.success ? data?.data[0] : [],
        error,
        licenceStatus: data?.success ? data?.vencida : false
    };
}


const SaveLicence = () => {
    const { licenceGet } = getLicence();
    const {
        mutate: mutateLicence,
        isLoading,
        error: errorLicence,
        data
    } = useMutation(
        (payload) => licenceGet?.id ? request.licence.put(payload) : request.licence.post(payload) 
    );

    return {
        isLoading,
        errorLicence,
        mutateLicence,
        data,
        licenStatus: data ? true : false
    };
};

export {
    getLicence,
    SaveLicence
};