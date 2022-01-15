import { useState, useEffect } from 'react';
import { format, clean } from 'rut.js'
// import { register } from '../../hooks';

export const Actions = () => {
    // const { isLoading, error, signUp } = register();

    // useEffect(() => {
    //     if (error) {
    //     }
    // }, [error]);
    const [values, setValues] = useState({
        rut: "",
        password: "",
        repeatPassword: ""
    });
    const { rut, password, repeatPassword } = values;
    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]:
                prop === "rut" ? format(event.target.value) : event.target.value,
        });
    };
    const handleSubmit = () => {
        signUp({ rut: clean(rut), password: password });
    }
    return {
        handleChange,
        handleSubmit,
        // loading: isLoading,
        rut,
        password,
        repeatPassword
    };
};

