import { useState, useEffect } from 'react';
import { format, clean } from 'rut.js'
import { register, getUser } from '../../hooks';

const dataValues = {
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    rutpersona: "",
    clavesiipersona: "",
    clavecertificado: "",
    rutempresa: "",
    clavesiiempresa: ""
}

export const Actions = () => {
    const { isLoading, error, nuxoSignUp, data } = register();
    const { user, status: userStatus } = getUser();
    const [values, setValues] = useState(dataValues);
    const [scene, setScene] = useState(0);
    const [licencia, setlicencia] = useState("");
    console.log(error, data, user);
    useEffect(() => {
        if(userStatus){
            setValues(user);
            setScene(4)
        }
    }, [user]);

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
    const handleChangelicencia = (event) => {
        setlicencia(event.target.value);
    }

    const handleSubmit = () => {
        nuxoSignUp({ rutpersona: clean(rutpersona), clavesiipersona });
        setScene(scene === 0 ? 1 : scene === 2 ? 3 : 4);
    }

    const handleSubmitprofile = () => {
        nuxoSignUp({ nombre, apellido, correo, telefono, rutpersona: clean(rutpersona), clavesiipersona });
        setScene(scene === 0 ? 1 : scene === 2 ? 3 : 4);
    }

    const handleSubmitempresa = () => {
        nuxoSignUp({ nombre, apellido, correo, telefono, rutpersona: clean(rutpersona), clavesiipersona });
        setScene(scene === 0 ? 1 : scene === 2 ? 3 : 4);
    }
    const saveLicenc = () => {
        console.log(licencia);
        setScene(2);
    }

    return {
        handleChange,
        handleSubmit,
        handleSubmitprofile,
        handleSubmitempresa,
        handleChangelicencia,
        saveLicenc,
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
        clavesiiempresa,
        scene,
        setScene,
        user
    };
};

