import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { validate } from 'rut.js';
import logo from '../../images/android-chrome-512x512.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
const ViewRegister = (props) => {
    const {
        handleChange,
        handleSubmit,
        loading,
        rutpersona,
        clavesiipersona,
        user,
        setScene } = props;
    const [pass, setPass] = useState(false);
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
            <FormControl sx={{ width: '100%' }} required variant="outlined">
                <InputLabel htmlFor="clavesiipersona" required>Clave sii persona</InputLabel>
                <OutlinedInput
                    margin="normal"
                    onChange={handleChange("clavesiipersona")}
                    value={clavesiipersona}
                    required
                    fullWidth
                    id="clavesiipersona"
                    label="Clave sii persona"
                    name="clavesiipersona"
                    type={pass ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    setPass(!pass);
                                }}
                                edge="end"
                            >
                                {pass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>

                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                onClick={handleSubmit}
                fullWidth
                disabled={validate(rutpersona) && clavesiipersona && !loading ? false : true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Registrate
            </Button>
            {user?.rutpersona ?
                <Button
                    onClick={() => setScene(4)}
                    fullWidth
                    disabled={!loading ? false : true}
                    variant="outlined"
                    sx={{ mt: 1, mb: 2 }}
                >
                    Volver
                </Button>
                :
                null
            }

        </Box>
    );

}

const ViewLicencia = (props) => {
    const { licencia, handleChangelicencia, saveLicenc,
        user,
        loadingLicence,
        setScene } = props
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
                disabled={licencia && !loadingLicence ? false : true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Registrar Licencia
            </Button>
            <Button
                onClick={() => setScene(4)}
                fullWidth
                disabled={!loadingLicence ? false : true}
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
            >
                {user?.nombre ? "Volver" : "Omitir"}
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
        setScene,
        user } = props;
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
                onClick={() => setScene(4)}
                fullWidth
                disabled={!loading ? false : true}
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
            >
                Volver
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
        clavesiiempresa,
        setScene } = props;
    const [pass1, setPass1] = useState(false);
    const [pass, setPass] = useState(false);
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
            <Box sx={{ marginBottom: "20px" }} />
            <FormControl sx={{ width: '100%' }} required variant="outlined">
                <InputLabel htmlFor="clavesiiempresa" required>Clave sii empresa</InputLabel>
                <OutlinedInput
                    margin="normal"
                    onChange={handleChange("clavesiiempresa")}
                    value={clavesiiempresa}
                    required
                    fullWidth
                    name="clavesiiempresa"
                    label="Clave sii empresa"
                    id="clavesiiempresa"
                    type={pass ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    setPass(!pass);
                                }}
                                edge="end"
                            >
                                {pass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Box sx={{ marginBottom: "20px" }} />
            <FormControl sx={{ width: '100%' }} required variant="outlined">
                <InputLabel htmlFor="clavecertificado" required>Clave Certificado</InputLabel>
                <OutlinedInput
                    margin="normal"
                    onChange={handleChange("clavecertificado")}
                    value={clavecertificado}
                    fullWidth
                    id="clavecertificado"
                    label="Clave Certificado"
                    name="clavecertificado"
                    type={pass1 ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                    setPass1(!pass1);
                                }}
                                edge="end"
                            >
                                {pass1 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <Button
                onClick={handleSubmit}
                fullWidth
                disabled={validate(rutempresa) && clavesiiempresa && !loading ? false : true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Guardar Datos
            </Button>
            <Button
                onClick={() => setScene(4)}
                fullWidth
                disabled={!loading ? false : true}
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
            >
                Volver
            </Button>
        </Box>
    );

}

const DashboardView = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (scene) => {
        setAnchorEl(null);
        props.setScene(scene);
    };
    const { loadingLicence, loading } = props
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
            {loadingLicence || loading && (<Box style={{
                position: "fixed",
                top: "0px",
                width: "100%",
                height: "100vh",
                opacity: "70%",
                backgroundColor: "black",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center"
            }} >
                <Typography variant="h5" color="white" gutterBottom component="div">
                    Guardando Datos
                </Typography>
                <CircularProgress size={100} />
            </Box>)}
            <Box sx={{
                display: 'flex',
                flexDirection: props?.scene === 4 ? "flex" : "column",
                alignItems: 'center',
                width: "100%",
                padding: "10px",
                borderBottom: "1px solid #f0826c"
            }} >
                <Typography component="h1" variant="h5" color={"primary"}>
                    {sceneActions[props?.scene].title}
                </Typography>
                {
                    props?.scene === 4 ?
                        <Box sx={{
                            marginLeft: "auto"
                        }}>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
                            </IconButton>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => handleClose(4)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={() => handleClose(2)}>Perfil</MenuItem>
                                <MenuItem onClick={() => handleClose(0)}>Cuenta SII Personal</MenuItem>
                                <MenuItem onClick={() => handleClose(3)}>Cuenta SII Empresa</MenuItem>
                                <MenuItem onClick={() => handleClose(1)}>Licencia</MenuItem>
                            </Menu>
                        </Box>
                        :
                        null
                }

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
                        <Typography component={props?.scene === 4 ? "h1" : "div"} variant={props?.scene === 4 ? "h4" : "subtitle2"} color={props?.scene === 4 ? "#388e3c" : ""} >
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