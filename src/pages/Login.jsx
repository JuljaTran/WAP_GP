import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "../context/useUser.js";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        const url = "http://localhost:1234/api/login";

       try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email, password})
            });

            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

            const result = await response.json();
            console.log("Login successful:", result);
            login(result.user);
            if (!result.user.avatar) {
                navigate("/avatar");
            } else {
                navigate("/home");
}

        } catch (error) {
            console.error("Login error:", error.message);
            setError(error.message);
        }
    };

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

      {/* Login form */}
      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 400, mb: 5 }}>
          Welcome back, <Box component="span" sx={{ fontWeight: 700 }}>Log In!</Box>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: '#032051' } }}
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              '&:hover': { backgroundColor: '#557EDC', color: '#FFFFFF' }
            }}
          >
            Log in
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
            <Typography sx={{ fontWeight: 500 }}>Don’t have an account yet?</Typography>
            <Button
              component={Link}
              to="/register"
              variant="text"
              sx={{ color: '#80B0FF', textTransform: 'none', fontWeight: 600 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}


export default Login;
