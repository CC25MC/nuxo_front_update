import { useState } from "react";
import { getVersion } from '../useVersion';

var http = window.require('http');
var fs = window.require('fs');
const decompress = window.require('decompress');
var rimraf = window.require("rimraf");
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const dataDownload = () => {
    const { version } = getVersion();
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
        var request = http.get(`http://descargas.nuxo.cl/storage/${version?.url}`, function(response) {
          response.pipe(file);

          setDownloadstatus('Descargando');

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
          //fs.unlinkSync("descargas/file.zip"); // Delete the file async. (But we don't check the result)
          console.log(err);
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
        //crear carpeta temp
        if (!fs.existsSync('temp')){
          fs.mkdirSync('temp');
        }
        //respaldar db
        fs.copyFile('statico/db/data/database.sqlite', 'temp/database.sqlite', (err) => {
          if (err) throw err;
          console.log('source.txt was copied to destination.txt');
        });
        //borrar archivos
        setDecompresstatus('borrando archivos actuales')
        await rimraf("statico", function () { setDecompresstatus('archivos borrados'); });
        //crear directorio
        if (!fs.existsSync('statico')){
          fs.mkdirSync('statico');
        }
        if (!fs.existsSync('statico/db')){
          fs.mkdirSync('statico/db');
        }
        if (!fs.existsSync('statico/db/data')){
          fs.mkdirSync('statico/db/data');
        }
        //descomprimir
        await setDecompresstatus('descomprimiento archivos')
        const files = decompress('descargas/file.zip', 'statico').then(files => {
            setDecompresstatus('archivos descomprimidos con exito')
        //pegar base de datos
        fs.copyFile('temp/database.sqlite','statico/db/data/database.sqlite' , (err) => {
          if (err) throw err;
          console.log('source.txt was copied to destination.txt');
        });
        rimraf("temp", function () { setDecompresstatus('archivos borrados'); });
        //iniciar servidor
        ipcRenderer.send('restart_app');
        setDecompresstatus('reiniciando servidor')
        });
        //borrar temp
        //await rimraf("temp", function () { setDecompresstatus('archivos borrados'); });
        
        
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