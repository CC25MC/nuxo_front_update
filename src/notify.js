import React, { useState, useEffect } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { dataDownload, getVersion, getActualVersion } from './hooks';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const Notify = () => {
  const [notification, setNotification] = useState(false);
  const { version } = getVersion();
  const { actual } = getActualVersion();
  const {
    download,
    descomprimir,
    downloadstatus,
    downloadpercentage,
    downloadbytes,
    downloadtotalbytes,
    decompresstatus } = dataDownload();

  const chekingUpdate = () => {
    // console.log(actual);
    // console.log(ver[ver.length - 1]);
    if (version?.version > actual?.version) {
      download();
      setNotification(true)
    }
  }

  useEffect(() => {
    chekingUpdate();
  }, [version, actual]);

  useEffect(() => {
    ipcRenderer.send('restart_app');
  }, []);

  ipcRenderer.on('message', function (event, text) {
    download();
    setNotification(true)
  });

  const restartApp = () => {
    descomprimir();
    setNotification(false)
  }

  return (
    notification &&
    <Box style={{
      position: "fixed",
      bottom: "20px",
      left: "20px",
      width: "300px",
      padding: "20px",
      borderRadius: "5px",
      backgroundColor: "white",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    }}>
      {downloadstatus === "descarga erronea" ?
        <Alert severity="warning">Ups!! parece que el servidor no responde.</Alert>
        :
        <>
          {downloadstatus ? downloadstatus : "Actualizacion Disponible"}
          <Box style={{ marginTop: "10px" }} />
          <LinearProgress variant="determinate" value={downloadpercentage} />
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
  )
}

export default Notify;
