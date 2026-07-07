import { Box, Button, Container, Paper, TextField, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate} from "react-router-dom";

export default function SignUp() {
   const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#111827",
        py: 6,
      }}
    >
        <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            Sign Up
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Email" type="email" fullWidth required />

            <TextField label="Create your Password" type="password" fullWidth required />

             <TextField label="Confirm Password" type="password" fullWidth required />

            <Button type="submit" variant="contained" fullWidth size="large">
              Sign up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}