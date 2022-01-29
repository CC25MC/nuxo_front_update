import { request } from "../../api";
import { useMutation, useQuery } from 'react-query';


const getUser = () => {
    const { isLoading, data, error } = useQuery(
        "/users",
        () => request.user.getUsers()
        // ,
        // {
        //     refetchInterval: 30000,
        // }
    );
    return {
        isLoading,
        user: data?.data[0] || [],
        error,
        status: data?.data[0]?.rutpersona ? true : false
    };
}


const register = () => {
    const { user } = getUser();
    const {
        mutate: nuxoSignUp,
        isLoading,
        error: errorRegister,
        data
    } = useMutation(
        (payload) => user?.id ? request.user.putUsers(payload) : request.user.signUp(payload)
    );

    return {
        isLoading,
        errorRegister,
        nuxoSignUp,
        status: data?.success,
        data
    };
};

export {
    register,
    getUser
};