import React, { Suspense, lazy } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from 'react-query';
import Notify from './notify';
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
// import { Breadcrumbs } from "./components";

import {dataDownload} from './hooks/dataDownload';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      light: '#f0826c',
      main: '#fa4f27',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#75bad2',
      main: '#099ac5',
      dark: '#ba000d',
      contrastText: '#000',
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#388e3c',
      contrastText: '#000',
    }
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

const App = () => {

  const {download,descomprimir,downloadstatus,downloadpercentage,downloadbytes,downloadtotalbytes,decompresstatus} = dataDownload();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>{downloadstatus}</div>
      <div>{downloadpercentage}</div>
      <div>{downloadbytes}</div>
      <div>{downloadtotalbytes}</div>
      <div>{decompresstatus}</div>
      <button onClick={download}>descargar</button>
      <button onClick={descomprimir}>descomprimir</button>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <DashboardScreen />
          <Notify />
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>

  )
}

export default App
