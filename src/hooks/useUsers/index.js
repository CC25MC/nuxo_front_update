import request from "../../api";
import { useMutation } from 'react-query';

const register = () => {
    const {
        mutate: nuxoSignUp,
        isLoading,
        error,
        status,
        data
    } = useMutation(
        (payload) => request.user.signUp(payload)
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
    register
};