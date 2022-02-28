import React, { useState, useEffect } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { getVersion, getActualVersion, useServer } from './hooks';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const style = {
  position: "fixed",
  bottom: "20px",
  left: "20px",
  width: "300px",
  padding: "20px",
  borderRadius: "5px",
  backgroundColor: "white",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
}

const Notify = () => {
  const [notification, setNotification] = useState(false);
  const { server, setServer }  = useServer();
  // const [serverStatus, setServerStatus] = useState("");
  const [downloadstatus, setDownloadstatus] = useState('');
  const [fileLoading, setFileLoading] = useState(false);
  const [downloadpercentage, setDownloadpercentage] = useState('');
  const { version } = getVersion();
  const { actual } = getActualVersion();

  const chekingUpdate = () => {
    if (version?.version > actual?.version) {
      ipcRenderer.send('downloadUpdate');
      setNotification(true)
    }
  }

  useEffect(() => {
    chekingUpdate();
  }, [version, actual]);

  useEffect(() => {
    if (server === "" || server === "Directorio existe") {
      ipcRenderer.send('restart_app');
    } else if (server === "Directorio no existe"){
      setNotification(true)
    }
  }, []);

  ipcRenderer.on('message', function (event, text) {
    if (text === "Directorio no existe") {
      setServer(text);
      setNotification(true)
    } else {
      setServer(text);
    }
  });

  ipcRenderer.on('status', function (event, text) {
    setDownloadstatus(text)
    setNotification(true)
  });

  ipcRenderer.on('decompress', function (event, text) {
    if (text === "apagando el servidor" || text === "descomprimiento archivos") {
      setFileLoading(true);
      setDownloadstatus(text)
    } else if (text === "reiniciando servidor") {
      setFileLoading(false);
    }
  });

  ipcRenderer.on('percentage', function (event, text) {
    setDownloadpercentage(text)
  });

  ipcRenderer.on('exit', function (event, text) {
    setServer("");
  });

  const restartApp = () => {
    ipcRenderer.send('decompressUpdate');
    setNotification(false)
  }

  return (
    <>
      {fileLoading && (<Box style={{
        position: "absolute",
        top: "0px",
        width: "100%",
        height: "100%",
        opacity: "70%",
        backgroundColor: "black",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
      }}>

        <Typography variant="h6" color="white" gutterBottom component="div">
          {downloadstatus}
        </Typography>
        <CircularProgress size={100} />

      </Box>)}
      {notification && (
        <Box style={style}>
          {downloadstatus === "descarga erronea" ?
            <Alert severity="warning">Ups!! parece que el servidor no responde.</Alert>
            :
            <>
              {downloadstatus ? downloadstatus : "Actualizacion Disponible"}
              <Box style={{ marginTop: "10px" }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={downloadpercentage} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round(
                    downloadpercentage
                  )}%`}</Typography>
                </Box>
              </Box>
              <Box style={{
                display: "flex",
                marginTop: 10,
                flexDirection: "row",
              }}>
                {downloadstatus === "descarga finalizada" && (
                  <Button style={{ marginLeft: "auto" }} variant="contained" color="primary" onClick={restartApp}>Cerrar</Button>
                )
                }
              </Box>
            </>
          }

        </Box>
      )}
    </>
  )
}

export default Notify;
