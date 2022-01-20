import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
import logo from '../../images/apple-touch-icon.png';
import { RestaurantMenu } from '@mui/icons-material';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ViewRegister = (props) => {
    const {
        handleChange,
        handleSubmit,
        loading,
        nombre,
        apellido,
        correo,
        telefono,
        rutpersona,
        clavesiipersona,
        clavecertificado,
        rutempresa,
        clavesiiempresa } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar src={logo} sx={{ p: 1, width: 100, height: 100 }} />
            <Typography component="h1" variant="h5">
                Registrate
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
                Asegurate de registrar la cuenta de Eboleta
            </Typography>
            <Box sx={{ mt: 1 }}>
                {/* <TextField
                    margin="normal"
                    onChange={handleChange("nombre")}
                    value={nombre}
                    required
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
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                /> */}
                {/* <TextField
                    margin="normal"
                    onChange={handleChange("correo")}
                    value={correo}
                    required
                    fullWidth
                    id="email"
                    label="Correo"
                    name="email"
                />
                <TextField
                    margin="normal"
                    onChange={handleChange("telefono")}
                    value={telefono}
                    required
                    fullWidth
                    id="phone"
                    label="Telefono"
                    name="phone"
                /> */}
                
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
                {/* <TextField
                    margin="normal"
                    onChange={handleChange("clavecertificado")}
                    value={clavecertificado}
                    required
                    fullWidth
                    type="password"
                    id="clavecertificado"
                    label="Clave Certificado"
                    name="clavecertificado"
                />
                <TextField
                    margin="normal"
                    onChange={handleChange("rutempresa")}
                    value={rutempresa}
                    required
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
                    required
                    fullWidth
                    onChange={handleChange("clavesiiempresa")}
                    value={clavesiiempresa}
                    name="clavesiiempresa"
                    label="Clave sii empresa"
                    type="password"
                    id="clavesiiempresa"
                /> */}

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
        </Box>
    );

}

const ViewLicencia = (props) => {
    const { licencia, handleChangelicencia, savelicencia } = props
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <Avatar src={logo} sx={{ p: 1, width: 100, height: 100 }} />
            <Typography component="h1" variant="h5">
                Licencia
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
                Disfruta de todos los servicios que podemos ofrecer registrando tu licencia,
                si aun no cuentas con la tuya
                <Link href="#" variant="body2">
                    {" Contáctanos"}
                </Link>
            </Typography>
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
                    onClick={savelicencia}
                    fullWidth
                    disabled={licencia ? false : true}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Registrar Licencia
                </Button>
            </Box>
        </Box>
    );
}

const scene = (key, props) => {
    switch (key) {
        case 1:  
            return <ViewRegister {...props} />;
        case 2:
            return <ViewLicencia {...props} />;
        case 3:
            return;
        case 4:  
            return;
    }    
}

const DashboardView = (props) => {
    const [value, setValue] = useState(1);

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box sx={{ width: '100%' }}>
                {scene(value, props)}
            </Box>
        </Container>

    );
};

export default DashboardView;