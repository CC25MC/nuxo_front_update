import { useState, useEffect } from 'react';
import { format, clean } from 'rut.js'
import { useSnackbar } from 'notistack';
import { login } from '../../hooks';

export const Actions = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { signIn, isLoading, error } = login();
    
    useEffect(() => {
        if (error) {
            enqueueSnackbar('Ah Ocurrido un error', { variant: 'error' });
        }
    }, [error]);
    
    const [values, setValues] = useState({
        rut: "",
        password: "",
    });
    const { rut, password } = values;
    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]:
                prop === "rut" ? format(event.target.value) : event.target.value,
        });
    };
    const handleSubmit = () => {
        signIn({ rut: clean(rut), password: password });
    }
    return {
        handleChange,
        handleSubmit,
        loading: isLoading,
        rut,
        password
    };
};

