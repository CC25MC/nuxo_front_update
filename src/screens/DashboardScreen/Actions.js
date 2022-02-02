import { useState, useEffect } from 'react';
import { format, clean } from 'rut.js'
import { register, getUser, SaveLicence, getLicence } from '../../hooks';
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, errorRegister, nuxoSignUp, data, status } = register();
    const { user, status: userStatus } = getUser();
    const [values, setValues] = useState(dataValues);
    const [scene, setScene] = useState(0);
    const [licencia, setlicencia] = useState("");
    const { mutateLicence, data: licence, errorLicence, licenStatus } = SaveLicence()
    const { licenceGet, licenceStatus } = getLicence();
    // console.log(licence);

    useEffect(() => {
        if (userStatus) {
            setValues(user);
            setScene(4)
        }
    }, [user, licence]);

    useEffect(() => {
        if (licenceStatus) {
            setlicencia("");
            enqueueSnackbar('Licencia Vencida por favor renuevala', { variant: 'error' });
            setScene(1)
        } else if (licenceGet?.licencia) {
            setlicencia(licenceGet?.licencia);
            setScene(4)
        }
    }, [licenceGet]);

    useEffect(() => {
        if (errorRegister) {
            enqueueSnackbar('Ah Ocurrido un error', { variant: 'error' });
        }
    }, [errorRegister]);

    useEffect(() => {
        if (errorLicence) {
            enqueueSnackbar('Licencia No existe', { variant: 'error' });
        }
    }, [errorLicence]);

    useEffect(() => {
        if (status) {
            enqueueSnackbar('Datos registrados con exito', { variant: 'success' });
            setScene(user?.rutpersona ? 4 : 1);
        }
        if (!licenStatus && user?.rutpersona) {
            enqueueSnackbar('Licencia registrada con exito', { variant: 'success' });
            setScene(4);
        }
    }, [status, licenStatus]);
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
        nuxoSignUp({ nombre, apellido, correo, telefono, rutpersona: clean(rutpersona), clavesiipersona, clavecertificado, rutempresa: clean(rutempresa), clavesiiempresa });
    }

    const saveLicenc = () => {
        mutateLicence({ licencia: licencia });
    }

    return {
        handleChange,
        handleSubmit,
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

