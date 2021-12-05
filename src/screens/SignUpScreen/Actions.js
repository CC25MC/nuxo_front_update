import { useState, useEffect } from 'react';
import { format, clean } from 'rut.js'
import { register } from '../../hooks';
import { useSnackbar } from 'notistack';

export const Actions = () => {
    const { isLoading, error, signUp } = register();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error) {
            enqueueSnackbar('Ah Ocurrido un error', { variant: 'error' });
        }
    }, [error]);
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
        // enqueueSnackbar('Usuario Registrandose', { variant: 'success' });
    }
    return {
        handleChange,
        handleSubmit,
        loading: isLoading,
        rut,
        password,
        repeatPassword
    };
};

