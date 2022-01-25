import { useState } from "react";
var http = window.require('http');
var fs = window.require('fs');
const decompress = window.require('decompress');
var rimraf = window.require("rimraf");
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const dataDownload = () => {

    //const [data,setData] = useState('');
    const [downloadstatus,setDownloadstatus] = useState('')
    const [downloadpercentage,setDownloadpercentage] = useState('');
    const [downloadbytes,setDownloadbytes] = useState('');
    const [downloadtotalbytes,setDownloadtotalbytes] = useState('');
    const [decompresstatus,setDecompresstatus] = useState('');
    

    const download = () =>{

        if (!fs.existsSync('descargas')){
            fs.mkdirSync('descargas');
        }

        var file = fs.createWriteStream("descargas/file.zip");
        var request = http.get("http://nuxo.cl/archivo/dist.zip", function(response) {
          response.pipe(file);

          setDownloadstatus('descargando');

          var len = parseInt(response.headers['content-length'], 10);
            var body = "";
            var cur = 0;
            var porcentage = "";
            var bytes = "";
            var total = len / 1048576; //1048576 - bytes in  1Megabyte
            setDownloadtotalbytes(total);
            
          response.on("data", function(chunk) {
            body += chunk;
            cur += chunk.length;
            porcentage =  parseFloat((100.00 * cur) / len ).toFixed(2); 
            setDownloadpercentage(porcentage);
            bytes = parseFloat(cur / 1048576).toFixed(2);
            // + "mb de " + parseFloat(total).toFixed(2) + "mb"      crear otra variable
            setDownloadbytes(bytes);
        });

          
          file.on('finish', function() {
            file.close(); 
            setDownloadstatus('descarga finalizada');
          });
        }).on('error', function(err) { // Handle errors
          fs.unlink("descargas/file.zip"); // Delete the file async. (But we don't check the result)
          setDownloadstatus('descarga erronea');
          setDownloadpercentage('');
          setDownloadbytes('');
        });

    }

    const descomprimir = async () =>{

        if (!fs.existsSync('descargas')){
          fs.mkdirSync('descargas');
        }
        //apagar servidor
        var request = await http.get("http://localhost:9000/api/server/close", function(response) {
          setDecompresstatus('apagando el servidor')
        });
        //borrar archivos
        setDecompresstatus('borrando archivos actuales')
        await rimraf("statico", function () { setDecompresstatus('archivos borrados'); });
        //crear directorio
        if (!fs.existsSync('statico')){
          fs.mkdirSync('statico');
        }
        //descomprimir
        await setDecompresstatus('descomprimiento archivos')
        const files = decompress('descargas/file.zip', 'statico').then(files => {
            setDecompresstatus('archivos descomprimidos con exito')
        //iniciar servidor
        ipcRenderer.send('restart_app');
        setDecompresstatus('reiniciando servidor')
        });
        
        
    }

    return {
        download,
        descomprimir,
        downloadstatus,
        downloadpercentage,
        downloadbytes,
        downloadtotalbytes,
        decompresstatus
    };
};

export {
    dataDownload
};