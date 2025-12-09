import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#669FFD' },     
    secondary: { main: '#80B0FF' },  
    background: { default: '#FFFFFF' },
    text: { primary: '#032051' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto"',
    h5: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: {
        root: { borderRadius: 30, textTransform: 'none' }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 }
      }
    }
  }
});

export default theme;