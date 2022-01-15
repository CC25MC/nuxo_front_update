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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
        rut,
        password } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <CssBaseline />
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
                    // onChange={handleChange("rut")}
                    // value={rut}
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    // onChange={handleChange("rut")}
                    // value={rut}
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                />
                <TextField
                    margin="normal"
                    // onChange={handleChange("rut")}
                    // value={rut}
                    required
                    fullWidth
                    id="email"
                    label="Correo"
                    name="email"
                />
                <TextField
                    margin="normal"
                    // onChange={handleChange("rut")}
                    // value={rut}
                    required
                    fullWidth
                    id="phone"
                    label="Telefono"
                    name="phone"
                />

                <TextField
                    margin="normal"
                    onChange={handleChange("rut")}
                    value={rut}
                    required
                    fullWidth
                    id="rutPerson"
                    label="Rut Persona"
                    name="rutPerson"
                    autoComplete="rut"
                />
                {validate(rut) ?
                    <Alert severity="success">Rut válidado correctamente</Alert>
                    :
                    rut && <Alert severity="error">Este rut no es válido</Alert>
                }
                <TextField
                    margin="normal"
                    // onChange={handleChange("rut")}
                    // value={rut}
                    required
                    fullWidth
                    id="clavesiipersona"
                    label="Clave sii persona"
                    name="clavesiipersona"
                    type="password"
                />
                <TextField
                    margin="normal"
                    // onChange={handleChange("rut")}
                    // value={rut}
                    required
                    fullWidth
                    type="password"
                    id="clavecertificado"
                    label="Clave Certificado"
                    name="clavecertificado"
                />
                <TextField
                    margin="normal"
                    // onChange={handleChange("rut")}
                    // value={rut}
                    required
                    fullWidth
                    id="rutempresa"
                    label="Rut Empresa"
                    name="rutempresa"
                />
                {validate(rut) ?
                    <Alert severity="success">Rut válidado correctamente</Alert>
                    :
                    rut && <Alert severity="error">Este rut no es válido</Alert>
                }
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    // onChange={handleChange("password")}
                    // value={password}
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
                    // disabled={validate(rut) && password && password === repeatPassword && !loading ? false : true}
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
    );
};

export default DashboardView;