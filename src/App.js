import React, { Suspense, lazy } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from 'react-query';
import { SnackbarProvider } from 'notistack';
const Notify = lazy(() => import('./notify'));
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
// import { Breadcrumbs } from "./components";

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <DashboardScreen />
            <Notify />
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Suspense>

  )
}

export default App