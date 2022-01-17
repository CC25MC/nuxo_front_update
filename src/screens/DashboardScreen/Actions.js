import { useState, useEffect } from 'react';
import { format, clean } from 'rut.js'
import { register } from '../../hooks';

export const Actions = () => {
    const { isLoading, error, nuxoSignUp, status, data } = register();
    console.log(error, status, data);
    // useEffect(() => {
    //     if (error) {
    //     }
    // }, [error]);
    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        rutpersona: "",
        clavesiipersona: "",
        clavecertificado: "",
        rutempresa: "",
        clavesiiempresa: ""
    });
    const { 
        nombre, 
        apellido, 
        correo, 
        telefono, 
        rutpersona, 
        clavesiipersona, 
        clavecertificado, 
        rutempresa, 
        clavesiiempresa } = values;
    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]:
                prop === "rutpersona" || prop === "rutempresa" ? format(event.target.value) : event.target.value,
        });
    };
    const handleSubmit = () => {
        nuxoSignUp({ nombre, apellido, correo, telefono, rutpersona: clean(rutpersona), clavesiipersona, clavecertificado, rutempresa: clean(rutempresa), clavesiiempresa });
    }
    return {
        handleChange,
        handleSubmit,
        loading: isLoading,
        nombre, 
        apellido, 
        correo, 
        telefono, 
        rutpersona, 
        clavesiipersona, 
        clavecertificado, 
        rutempresa, 
        clavesiiempresa
    };
};

