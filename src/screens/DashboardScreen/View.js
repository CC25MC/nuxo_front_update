import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import { validate } from 'rut.js';
import logo from '../../images/android-chrome-512x512.png';

const ViewRegister = (props) => {
    const {
        handleChange,
        handleSubmit,
        loading,
        rutpersona,
        clavesiipersona} = props;
    return (

        <Box sx={{ mt: 1 }}>
    
            <TextField
                margin="normal"
                onChange={handleChange("rutpersona")}
                value={rutpersona}
                required
                fullWidth
                id="rutPerson"
                label="Rut Persona"
                name="rutPerson"
                autoComplete="rut"
            />
            {validate(rutpersona) ?
                <Alert severity="success">Rut válidado correctamente</Alert>
                :
                rutpersona && <Alert severity="error">Este rut no es válido</Alert>
            }
            <TextField
                margin="normal"
                onChange={handleChange("clavesiipersona")}
                value={clavesiipersona}
                required
                fullWidth
                id="clavesiipersona"
                label="Clave sii persona"
                name="clavesiipersona"
                type="password"
            />
    
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Acepto las politicas de privacidad"
            />
            <Button
                onClick={handleSubmit}
                fullWidth
                disabled={validate(rutpersona) && clavesiipersona && !loading ? false : true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {false ? <CircularProgress color="secondary" /> : "Registrate"}
            </Button>
        </Box>
    );

}

const ViewLicencia = (props) => {
    const { licencia, handleChangelicencia, saveLicenc, setScene } = props
    return (
        <Box sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                onChange={handleChangelicencia}
                value={licencia}
                required
                fullWidth
                id="licencia"
                label="Licencia"
                name="licencia"
                autoFocus
            />

            <Button
                onClick={saveLicenc}
                fullWidth
                disabled={licencia ? false : true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Registrar Licencia
            </Button>
            <Button
                onClick={() => setScene(2)}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
            >
                Omitir
            </Button>
        </Box>
    );
}

const ViewProfile = (props) => {
    const {
        handleChange,
        handleSubmit,
        loading,
        nombre,
        apellido,
        correo,
        telefono,
        setScene } = props;
    return (

        <Box sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                onChange={handleChange("nombre")}
                value={nombre}
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoFocus
            />
            <TextField
                margin="normal"
                onChange={handleChange("apellido")}
                value={apellido}
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
            />
            <TextField
                margin="normal"
                onChange={handleChange("correo")}
                value={correo}
                fullWidth
                id="email"
                label="Correo"
                name="email"
            />
            <TextField
                margin="normal"
                onChange={handleChange("telefono")}
                value={telefono}
                fullWidth
                id="phone"
                label="Telefono"
                name="phone"
            />

            <Button
                onClick={handleSubmit}
                fullWidth
                disabled={!loading ? false : true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Guardar
            </Button>
            <Button
                onClick={() => setScene(3)}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
            >
                Omitir
            </Button>
        </Box>
    );

}

const ViewEmpresa = (props) => {
    const {
        handleChange,
        handleSubmit,
        loading,
        rutpersona,
        clavesiipersona,
        clavecertificado,
        rutempresa,
        clavesiiempresa } = props;
    return (

        <Box sx={{ mt: 1 }}>

            <TextField
                margin="normal"
                onChange={handleChange("rutempresa")}
                value={rutempresa}
                fullWidth
                id="rutempresa"
                label="Rut Empresa"
                name="rutempresa"
            />
            {validate(rutempresa) ?
                <Alert severity="success">Rut válidado correctamente</Alert>
                :
                rutempresa && <Alert severity="error">Este rut no es válido</Alert>
            }
            <TextField
                margin="normal"
                fullWidth
                onChange={handleChange("clavesiiempresa")}
                value={clavesiiempresa}
                name="clavesiiempresa"
                label="Clave sii empresa"
                type="password"
                id="clavesiiempresa"
            />

            <TextField
                margin="normal"
                onChange={handleChange("clavecertificado")}
                value={clavecertificado}
                fullWidth
                type="password"
                id="clavecertificado"
                label="Clave Certificado"
                name="clavecertificado"
            />

            <Button
                onClick={handleSubmit}
                fullWidth
                disabled={validate(rutpersona) && clavesiipersona && !loading ? false : true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Guardar Datos
            </Button>
            <Button
                onClick={() => setScene(4)}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
            >
                Omitir
            </Button>
        </Box>
    );

}

const DashboardView = (props) => {

    const sceneActions = [
        {
            title: "Registro",
            action: <ViewRegister {...props} />,
            subtitle: "Asegurate de registrar los datos correctos de SII"
        },
        {
            title: "Licencia",
            action: <ViewLicencia {...props} />,
            subtitle: "Disfruta de todos los servicios que podemos ofrecer registrando tu licencia, si aun no cuentas con la tuya "
        },
        {
            title: "Perfil",
            action: <ViewProfile {...props} />,
            subtitle: "Ingresa tus datos personales"
        },
        {
            title: "Perfil Empresa",
            action: <ViewEmpresa {...props} />,
            subtitle: "Datos de la empresa registrados en SII"
        },
        {
            title: "Inicio",
            subtitle: "!!! Servidor Activo !!!"
        },
    ]
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "100%",
                padding: "10px",
                borderBottom: "1px solid #f0826c"
            }} >
                <Typography component="h1" variant="h5" color={"primary"}>
                    {sceneActions[props?.scene].title}
                </Typography>
            </Box>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ marginBottom: props?.scene === 4 ? 5 : "20px" }} />
                        <Avatar src={logo} sx={{ p: props?.scene === 4 ? 5 : 1, width: props?.scene === 4 ? 350 : 100, height: props?.scene === 4 ? 350 : 100 }} />
                        <Typography component={props?.scene === 4 ? "h1": "div"} variant={props?.scene === 4 ? "h4": "subtitle2"} color={props?.scene === 4 ? "#388e3c" : ""} >
                            {sceneActions[props?.scene].subtitle}
                            {sceneActions[props?.scene].title === "Licencia"
                                &&
                                <Link target="_blank" rel="noreferrer" href="https://www.google.com/search?q=traductor&rlz=1C1CHBD_esVE923VE923&sxsrf=AOaemvKlp9o0X36j1TenGNmPnihGKxUESQ%3A1642650536187&ei=qNvoYfPvCuGvqtsPptyDwAE&ved=0ahUKEwjz48uNtr_1AhXhl2oFHSbuABgQ4dUDCA4&uact=5&oq=traductor&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyBAgjECcyCggAELEDEIMBEEMyCggAELEDEIMBEEMyCwgAEIAEELEDEIMBMgUIABCABDIICAAQgAQQsQMyBQgAEIAEMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwE6BwgjEOoCECc6BAgAEEM6BwgAELEDEENKBAhBGABKBAhGGABQAFiWDGCwDWgBcAJ4AIABiwGIAeEIkgEDMC45mAEAoAEBsAEKwAEB&sclient=gws-wiz" variant="body2">
                                    {"Contáctanos"}
                                </Link>
                            }
                        </Typography>
                        {
                            sceneActions[props?.scene].action
                        }

                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default DashboardView;