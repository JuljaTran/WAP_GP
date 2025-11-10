import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext.jsx';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { register, login } = useUser();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const url = "http://localhost:1234/api/auth/register";

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({username, email, password})  
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Register failed');
            }

            const result = await response.json();
            console.log("Register successful:", result);
            alert("Registration successful! You can now log in.");

            login(result.user);

            navigate('/avatar');
            
        } catch (error) {
            console.error("Register/Login error:", error.message);
            setError(error.message);

        }
    }

    return (
        <Box
            sx={{
            width: '100vw',
            minHeight: '100vh',
            bgcolor: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
        }}
    >

      {/* Background elements */}
      <Box
        component="img"
        src="/Assets/top_left_element.png"
        alt="Top left spheres"
        sx={{ position: 'absolute', top: 0, left: 0, width: 200, height: 'auto', zIndex: 0 }}
      />
      <Box
        component="img"
        src="/Assets/bottom_right_element.png"
        alt="Bottom right spheres"
        sx={{ position: 'absolute', bottom: 0, right: 0, width: 150, height: 'auto', zIndex: 0 }}
      />
      <Box
        component="img"
        src="/Assets/panda_bottom.png"
        alt="Panda"
        sx={{ position: 'absolute', width: 200, bottom: 0, height: 'auto', zIndex: 1 }}
      />

    {/* Register form */}
    <Container
        maxWidth="sm"
        sx={{ zIndex: 2 }}
    >

    <Typography variant="h3" sx={{ fontWeight: 400, mb: 5 }}>
          Hello, <Box component="span" sx={{ fontWeight: 700 }}>Register Now!</Box>
    </Typography>

    {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
            {error}
        </Alert>
    )}

    <Box
        component="form"
        onSubmit={handleRegister}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >

    <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
        fullWidth
        InputLabelProps={{ style: { color: '#032051' } }}
    />

    <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        fullWidth
        InputLabelProps={{ style: { color: '#032051' } }}
    />

    <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        fullWidth
        InputLabelProps={{ style: { color: '#032051' } }}
    />

    <Button
        type="submit"
        variant="contained"
        sx={{
            width: '100%',
            borderRadius: 30,
            py: 1.5,
            fontSize: '1.2rem',
            fontWeight: 600,
            backgroundColor: '#669FFD',
            color: '#FFFFFF',
            '&:hover': { backgroundColor: '#557EDC', color: '#FFFFFF' },
        }}
    >   
        Register
    </Button>

    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>

    <Typography sx={{ fontWeight: 500 }}>Already have an account?</Typography>

    <Button
        component={Link}
        to="/login"
        variant="text"
        sx={{ color: '#80B0FF', textTransform: 'none', fontWeight: 600 }}
    >
        Log In
            </Button>
          </Box>
        </Box>
    </Container>
    </Box>
    );
}

export default Register;