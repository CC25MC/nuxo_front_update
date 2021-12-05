import { useState, useEffect } from 'react';
import { emitTicket, getUsers } from '../../hooks';
import { useSnackbar } from 'notistack';
import { format, clean } from 'rut.js'

export const Actions = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { emit, error, isLoading, data } = emitTicket();
    const { error: errorUsers, isLoading: userLoading, data: Users } = getUsers();
    console.log(Users, userLoading);
    useEffect(() => {
        if (error) {
            enqueueSnackbar('Ah Ocurrido un error', { variant: 'error' });
        }
        if (errorUsers) {
            enqueueSnackbar('Ah Ocurrido un error cargando los usurarios', { variant: 'error' });
        }
    }, [error, errorUsers]);


    const [values, setValues] = useState({
        type: "",
        total: 0
    });
    const [idBoleta, setIdBoleta] = useState("");

    const handleChangeValues = (prop) => (event) => {
        setValues({
            ...values,
            [prop]:
                prop === "rut" ? format(event.target.value) : event.target.value,
        });
    };
    const receiverObj = (obj) => {
        if (obj?.name && obj?.details) {
            const receiver = {
                name: obj?.name,
                address: obj?.address,
                email: obj?.email,
                rut: clean(obj?.rut)
            }
            return { total: obj?.total, typeTicket: obj?.type, detail: obj?.details, receiver: receiver };
        } else if (obj?.name) {
            const receiver = {
                name: obj?.name,
                address: obj?.address,
                email: obj?.email,
                rut: clean(obj?.rut)
            }
            return { total: obj?.total, typeTicket: obj?.type, receiver: receiver };
        } else if (obj?.details) {
            return { total: obj?.total, typeTicket: obj?.type, detail: obj?.details, };
        } else {
            return { total: obj?.total, typeTicket: obj?.type };
        }
    }
    const handleEmit = () => {
        emit(receiverObj(values));
    }
    return {
        handleChangeValues,
        values,
        setValues,
        handleEmit,
        loading: isLoading,
        ticket: data,
        idBoleta, setIdBoleta
    };
};

