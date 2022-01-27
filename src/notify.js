import React, { useState, useEffect } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import { dataDownload, getVersion, getActualVersion } from './hooks';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const Notify = () => {
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
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

  // ipcRenderer.on('message', function (event, text) {
  //   if (text === "Actualización Disponible.") {
  //     setNotification(true);
  //     setMessage(text);
  //   } else if (text === "Actualización Descargada") {
  //     setMessage(text);
  //   }
  //   console.log(text);
  // });

  // ipcRenderer.on('progressbar', function (event, text) {
  //   setMessage("Descargando");
  //   setProgress(text);
  // });

  const restartApp = () => {
    descomprimir();
    setNotification(false)
  }

  // setInterval(() => {
  //   ipcRenderer.send('update_app');
  // }, 300000)

  return (
    true &&
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
      <div>{downloadstatus}</div>
      <div>{downloadpercentage}</div>
      <div>{downloadbytes}</div>
      <div>{downloadtotalbytes}</div>
      <div>{decompresstatus}</div>
      <button onClick={download}>descargar</button>
      <button onClick={descomprimir}>descomprimir</button>
      {downloadstatus ? downloadstatus : "No hay Actualizaciones"}
      <Box style={{ marginTop: "10px" }} />
      <LinearProgress variant="determinate" value={downloadpercentage} />
      <Box style={{
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
      }}>
        {downloadstatus === "Descargando" ?
          null
          :
          <>
            {/* <Button variant="contained" onClick={() => { setNotification(false) }}>Cerrar </Button> */}
            <Button style={{ marginLeft: "auto" }} variant="contained" color="primary" onClick={restartApp}>Cerrar</Button>
          </>
        }
      </Box>
    </Box>
  )
}

export default Notify;
