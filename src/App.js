import React from "react";
import Main from "./components/Main";
import CssBaseline from "@mui/material/CssBaseline"
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme( {
  palette: {
    type: 'dark',
    primary: {
      main: '#5893df',
    },
    secondary: {
      main: '#2ec5d3',
    },
    background: {
    //   default: '#192231',
    //   paper: '#24344d',
    //   paper: 'white',
        default: '#2b2d42',
        paper: 'white'
    },
  },
  typography: {
    fontFamily: [
    //   '-apple-system',
    //   'BlinkMacSystemFont',
    //   '"Segoe UI"',
    //   'Roboto',
    //   '"Helvetica Neue"',
    //   'Arial',
    //   'sans-serif',
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
      'Lexend Deca',
      'sans-serif'
    ].join(','),
  },

})

function App() {
    return (
        <ThemeProvider theme={theme} >
            <CssBaseline />
            
            <Main />
            
        </ThemeProvider>
    );
}

export default App;
