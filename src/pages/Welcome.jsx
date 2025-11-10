import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


function Welcome() {

    return (
         <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
    {/*Header Section - blue background*/}
      <Box
        sx={{
          width: '100%',
          height: '60vh',
          bgcolor: 'rgba(128, 176, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',
          borderBottomLeftRadius: 300,  
          borderBottomRightRadius: 300,
        }}
      >

    {/*Logo*/}
        <Box
          component="img"
          src= "/Assets/LOGO.png"
          alt="Panda logo"
          sx={{
            width: 250,
            height: 'auto',
            mt: '-60px',
            zIndex: 2,
          }}
        />

        {/*Title*/}
        <Typography
          variant="h1"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            mt: 2,
            mb: 2,
          }}
        >
          Quiz Zoo
        </Typography>
      </Box>

    {/*Buttons Section*/}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 3,
          position: 'absolute',
          bottom: 90,
          alignItems: 'center',
        }}
      >
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{
            width: 400,
            borderRadius: 30,
            py: 1.5,
            fontSize: '1.2rem',
            fontWeight: 600,
            backgroundColor: '#669FFD', 
            color: '#FFFFFF',
            '&:hover': { 
                backgroundColor: '#578be0ff' ,
                color:  '#FFFFFF',
            },
          }}
        >
          Log in
        </Button>

        <Button
          component={RouterLink}
          to="/register"
          variant="outlined"
          sx={{
            width: 400,
            borderRadius: 30,
            py: 1.5,
            fontSize: '1.2rem',
            fontWeight: 600,
            color: 'text.primary',
            borderColor: '#669FFD',
            '&:hover': { 
                backgroundColor: 'rgba(102, 159, 253, 0.1)' ,
                color: 'text.primary',
            },
          }}
        >
          Register
        </Button>
      </Container>
    </Box>
    );
}

export default Welcome;