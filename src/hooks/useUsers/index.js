import request from "../../api";
import { useMutation, useQuery } from 'react-query';


const getUser = () => {
    const { isLoading, data, error } = useQuery(
        "/users",
        () => request.user.getUsers()
    );
    return {
        isLoading,
        user: data?.data[0] || [],
        error,
    };
}


const register = () => {
    const { user } = getUser();
    const {
        mutate: nuxoSignUp,
        isLoading,
        error,
        status,
        data
    } = useMutation(
        (payload) => user ? request.user.putUsers(payload) : request.user.signUp(payload)
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
    register,
    getUser
};