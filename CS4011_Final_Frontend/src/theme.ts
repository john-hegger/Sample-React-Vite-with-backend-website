// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1DA1F2', 
        },
        secondary: {
            main: '#657786', 
        },
        background: {
            default: '#15202B',
            paper: '#1f07ab',   
        },
        text: {
            primary: '#E1E8ED', 
            secondary: '#8899A6',
        },
    },
    typography: {
        fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
        h4: {
            fontWeight: 600,
            color: '#E1E8ED',
        },
        body1: {
            fontSize: '1rem',
        },
    },
    shape: {
        borderRadius: 12, 
    },
});

export default theme;
