import { request } from "../../api";
import { useMutation, useQuery } from 'react-query';

const getLicence = () => {
    const { isLoading, data, error } = useQuery(
        "/api/licencia",
        () => request.licence.get()
    );
    return {
        isLoading,
        licenceGet: data?.data[0] ? data?.data[0] : [],
        error,
        licenceStatus: data?.vencida ? data?.vencida : false
    };
}


const SaveLicence = () => {
    const {
        mutate: mutateLicence,
        isLoading,
        error: errorLicence,
        data
    } = useMutation(
        (payload) => request.licence.post(payload)
    );

    return {
        isLoading,
        errorLicence,
        mutateLicence,
        data,
        licenStatus: data?.vencida ? data?.vencida : false
    };
};

export {
    getLicence,
    SaveLicence
};