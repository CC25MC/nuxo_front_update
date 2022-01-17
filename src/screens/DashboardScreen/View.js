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
import { validate } from 'rut.js';
import logo from '../../images/apple-touch-icon.png';
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
                Asegurate de registrar exactamente la cuenta de Eboleta
            </Typography>
            <Box sx={{ mt: 1 }}>
                <TextField
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
                />
                <TextField
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
                />

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
                <TextField
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
                />

                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Acepto las politicas de privacidad de la empresa"
                />
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    disabled={validate(rutempresa) && validate(rutpersona) && telefono && correo && nombre && apellido && clavesiiempresa && clavecertificado && clavesiipersona && !loading ? false : true}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {false ? <CircularProgress color="secondary" /> : "Registrate"}
                </Button>
            </Box>
        </Box>
    );

}

const DashboardView = (props) => {
    const [value, setValue] = useState(0);

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChangeValue} variant="fullWidth" aria-label="basic tabs example">
                        <Tab label="Registrar Cuenta SII" {...a11yProps(0)} />
                        <Tab label="Licencia" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ViewRegister {...props} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </Box>
        </Container>

    );
};

export default DashboardView;