import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Activate() {
    const { token} = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleActivate = async (e) => {
        e.preventDefault();
        try {
            //const response = await fetch(`http://localhost:1234/api/register/${token}`, {
            const response = await fetch(`http://localhost:1234/api/register/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Activation failed');
            }

            setSuccess(true);
            alert('Account activated! You can now log in.');
            navigate('/login');

        } catch (error) {
            console.error("Activation error:", error.message);
            setError(error.message);
        }
    };

return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        bgcolor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4
      }}
    >
      {/* Background elements */}
      <Box
        component="img"
        src="/Assets/top_left_element.png"
        alt="Top left spheres"
        sx={{ position: "absolute", top: 0, left: 0, width: 200, zIndex: 0 }}
      />
      <Box
        component="img"
        src="/Assets/bottom_right_element.png"
        alt="Bottom right spheres"
        sx={{ position: "absolute", bottom: 0, right: 0, width: 150, zIndex: 0 }}
      />
      <Box
        component="img"
        src="/Assets/panda_bottom.png"
        alt="Panda"
        sx={{ position: "absolute", width: 200, bottom: 0, zIndex: 1 }}
      />

      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 400, mb: 5 }}>
          Almost there,{" "}
          <Box component="span" sx={{ fontWeight: 700 }}>
            activate your account!
          </Box>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success ? (
          <Alert severity="success">
            Account activated! Redirecting to login…
          </Alert>
        ) : (
          <Box
            component="form"
            onSubmit={handleActivate}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Set your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              InputLabelProps={{ style: { color: "#032051" } }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: 30,
                py: 1.5,
                fontSize: "1.2rem",
                fontWeight: 600,
                backgroundColor: "#669FFD",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#557EDC",
                  color: "#FFFFFF"
                }
              }}
            >
              Activate account
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Activate;