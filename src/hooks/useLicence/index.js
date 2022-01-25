import { request } from "../../api";
import { useMutation, useQuery } from 'react-query';


const getLicence = () => {
    const { isLoading, data, error } = useQuery(
        "/users",
        () => request.user.getUsers()
    );
    return {
        isLoading,
        user: data?.data[0] || [],
        error,
        status: data?.data[0]?.rutpersona ? true : false
    };
}


const SaveLicence = () => {
    const { user } = getUser();
    const {
        mutate: nuxoSignUp,
        isLoading,
        error,
        data
    } = useMutation(
        (payload) => user?.rutpersona ? request.user.putUsers(payload) : request.user.signUp(payload)
    );

    return {
        isLoading,
        error,
        nuxoSignUp,
        status,
        data
    };
};

export {
    getLicence,
    SaveLicence
};