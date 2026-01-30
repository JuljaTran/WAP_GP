import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

export default function NotFound() {
    const navigate = useNavigate();

    return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#F7FAFF",
        px: 3
      }}
    >
      <Box
        sx={{
            justifyContent: "center",
            maxWidth: 500,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            px: 4,
            py: 6,
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
        }}
      >
        <Typography
            variant="h2"
            fontWeight={800}
            color="#4F6EF7"
            mb={1}
        >
            404
        </Typography>

        <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
        >
          Diese Seite existiert nicht
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 16,
            mb: 4
          }}
        >
          Oops! Der Link ist falsch oder die Seite wurde verschoben.
        </Typography>

        <Box
            component="img"
            src="/Assets/panda_bottom.png"
            alt="Panda"
            sx={{
                width: 180,
                mb: 4,
                userSelect: "none",
          }}
        />

        <Button
            onClick={() => navigate("/home")}
            sx={{
                display: "flex",
                justifyContent: "center",
                px: 5,
                py: 1.5,
                ml: 9,
                borderRadius: 30,
                fontSize: 16,
                fontWeight: 600,
                backgroundColor: "#4F6EF7",
                color: "#FFFFFF",
                "&:hover": {
                backgroundColor: "#3B5BDB"
                }
            }}
        >
          Zurück zur Startseite
        </Button>
      </Box>
    </Box>
  );
}