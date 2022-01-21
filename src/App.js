import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from 'react-query';
import Notify from './notify';
import DashboardScreen from './screens/DashboardScreen';
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <DashboardScreen />
        <Notify />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
