import { request } from "../../api";
import { useMutation, useQuery } from 'react-query';

const getLicence = () => {
    const { isLoading, data, error } = useQuery(
        "/api/licencia",
        () => request.licence.get()
    );
    return {
        isLoading,
        user: data?.data[0] || [],
        error,
        status: data?.data[0]?.rutpersona ? true : false
    };
}


const SaveLicence = () => {
    const {
        mutate: mutateLicence,
        isLoading,
        error,
        data
    } = useMutation(
        (payload) => request.licence.post(payload)
    );

    return {
        isLoading,
        error,
        mutateLicence,
        data
    };
};

export {
    getLicence,
    SaveLicence
};