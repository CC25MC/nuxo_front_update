import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ResponsiveAppBar } from "../../components";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

const DashboardView = ({ handleChangeValues, values, loading = false, handleEmit, ticket, idBoleta, setIdBoleta }) => {
    const [expanded, setExpanded] = useState(false);

    const [view, setView] = useState({
        details: false,
        receiver: false
    });
    const handleChangeView = (event, prop) => {
        setView({ ...view, [prop]: event.target.checked });
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <ResponsiveAppBar />
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Crear Boleta
                            </Typography>
                            <Chip label="activo" color="success" />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: "10px"
                            }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={handleChangeValues("total")}
                                    value={values?.total}
                                    name="total"
                                    label="Total"
                                    type="number"
                                    id="total"
                                />
                                <TextField
                                    id="type-boleta"
                                    margin="normal"
                                    required
                                    select
                                    label="Tipo de Boleta"
                                    fullWidth
                                    value={values?.type}
                                    onChange={handleChangeValues("type")}
                                    sx={{
                                        width: "100%"
                                    }}
                                >
                                    <MenuItem value={"afecta"}>
                                        Afecta
                                    </MenuItem>
                                    <MenuItem value={"exenta"}>
                                        Exenta
                                    </MenuItem>
                                </TextField>

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={view.receiver}
                                                onChange={(e) => handleChangeView(e, "receiver")}
                                                aria-label="receiver"
                                            />
                                        }
                                        label={"Receptor"}
                                    />
                                </FormGroup>

                                {view.receiver && (
                                    <Box sx={{ width: "100%" }}>
                                        <Box sx={{ marginBottom: 2, flexDirection: 'row', display: 'flex', }}>
                                            <TextField
                                                name="rut"
                                                required
                                                fullWidth
                                                onChange={handleChangeValues("rut")}
                                                value={values?.rut}
                                                id="rut"
                                                label="Rut"
                                                sx={{ marginRight: 2 }}
                                            />
                                            <TextField
                                                required
                                                fullWidth
                                                onChange={handleChangeValues("name")}
                                                value={values?.name}
                                                id="name"
                                                label="Nombre del receptor"
                                                name="name"
                                            />
                                        </Box>

                                        <Box sx={{ marginBottom: 2, flexDirection: 'row', display: 'flex', }}>
                                            <TextField
                                                name="address"
                                                fullWidth
                                                id="address"
                                                label="Dirección del Receptor"
                                                onChange={handleChangeValues("address")}
                                                value={values?.address}
                                                sx={{ marginRight: 2 }}
                                            />
                                            <TextField
                                                fullWidth
                                                id="email"
                                                label="Email del Receptor"
                                                name="email"
                                                onChange={handleChangeValues("email")}
                                                value={values?.email}
                                            />
                                        </Box>
                                    </Box>
                                )}

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={view.details}
                                                onChange={(e) => handleChangeView(e, "details")}
                                                aria-label="details"
                                            />
                                        }
                                        label={"Detalles"}
                                    />
                                </FormGroup>

                                {view.details && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        onChange={handleChangeValues("details")}
                                        value={values?.details}
                                        name="details"
                                        label="Detalles"
                                        id="details"
                                    />)}
                                <Button
                                    onClick={handleEmit}
                                    fullWidth
                                    disabled={!loading ? false : true}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <CircularProgress color="secondary" /> : "Emitir"}
                                </Button>
                                {ticket && (
                                    <Box>
                                        <Typography>Respuesta: </Typography>
                                        <Typography>Status: {ticket.status && "true"} </Typography>
                                        <Typography>Id: {ticket.id} </Typography>
                                        <Typography>Path: {ticket.path} </Typography>
                                        <Typography>Folio: {ticket.folio}</Typography>
                                        <Typography>Total: {ticket.total} </Typography>
                                    </Box>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Ver Boleta</Typography>
                            <Chip label="en construccion" color="warning" />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: "10px"
                            }}>
                                <TextField
                                    name="idboleta"
                                    fullWidth
                                    id="idboleta"
                                    label="Id Boleta"
                                    onChange={(e) => { setIdBoleta(e.target.value) }}
                                    value={idBoleta}
                                    sx={{ marginBottom: 2 }}
                                />
                                <embed src={`http://localhost:5000/api/tickets/view/${idBoleta}`} type="application/pdf" width="100%" height="400px" />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Usuarios</Typography>
                            <Chip label="en construccion" color="warning" />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                background: "black",
                                borderRadius: "10px"
                            }}>
                                <Typography sx={{
                                    color: "white"
                                }}>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Login
                            </Typography>
                            <Chip label="activo" color="success" />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                background: "black",
                                borderRadius: "10px"
                            }}>
                                <Typography sx={{
                                    color: "white"
                                }}>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
                                </Typography>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Container>
        </>
    );
};

export default DashboardView;