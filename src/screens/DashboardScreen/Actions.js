import { useState, useEffect } from 'react';
import { format, clean } from 'rut.js'
import { register, getUser } from '../../hooks';

export const Actions = () => {
    const { isLoading, error, nuxoSignUp, status, data } = register();
    const { user }= getUser();
    console.log(error, status, data, user);
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
    const [licencia, setlicencia] = useState("");
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
    const handleChangelicencia = (event) =>{
        setlicencia(event.target.value);
    }
    const handleSubmit = () => {
        nuxoSignUp({ nombre, apellido, correo, telefono, rutpersona: clean(rutpersona), clavesiipersona, clavecertificado, rutempresa: clean(rutempresa), clavesiiempresa });
    }
    return {
        handleChange,
        handleSubmit,
        handleChangelicencia,
        licencia,
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

