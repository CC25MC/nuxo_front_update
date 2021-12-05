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

const LoginView = ({ handleChange, handleSubmit, rut, password, loading = false }) => {
    return (
        <Container component="main" maxWidth="xs">
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
                    Iniciar Sesión
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recuerdame"
                    />
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        disabled={validate(rut) && password && !loading ? false : true}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress color="secondary" /> : "iniciar sesión"}
                    </Button>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Olvidaste tu contraseña?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Aún no tienes una cuenta? Registrate!!!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginView;