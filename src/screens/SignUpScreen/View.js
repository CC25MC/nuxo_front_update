import React from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { validate } from 'rut.js'

const SignUpView = ({ handleChange, handleSubmit, rut, password, repeatPassword, loading = false }) => {
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registrate
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                    Asegurate de registrar exactamente la cuenta de Eboleta
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        onChange={handleChange("rut")}
                        value={rut}
                        required
                        fullWidth
                        id="rut"
                        label="Rut"
                        name="rut"
                        autoComplete="rut"
                        autoFocus
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
                        onChange={handleChange("password")}
                        value={password}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        onChange={handleChange("repeatPassword")}
                        value={repeatPassword}
                        name="password"
                        label="Repetir Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {password !== repeatPassword && <Alert severity="error">Las contraseñas no son iguales</Alert>
                    }
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Acepto las politicas de privacidad de la empresa"
                    />
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        disabled={validate(rut) && password && password === repeatPassword && !loading ? false : true}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress color="secondary" /> : "Registrate"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/" variant="body2">
                                Volver
                            </Link>
                        </Grid>
                        {/* <Grid item style={{ marginLeft: "auto" }}>
                            <Link href="#" variant="body2">
                                {"Aún no tienes una cuenta? Registrate"}
                            </Link>
                        </Grid> */}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpView;