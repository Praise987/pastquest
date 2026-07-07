import { Box, Button, Container, Paper, TextField, Typography, Link, IconButton,} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export default function Login() {
  const navigate = useNavigate();

const formik = useFormik({
  initialValues: {
    email: "",
    password: "",
  },

  validationSchema,

  onSubmit: (values) => {
    console.log(values);

   
  },
});

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
        position: "relative",
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
            Login
          </Typography>
          <Box component="form"
          onSubmit={formik.handleSubmit}
           sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            }}
            >
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              Login
            </Button>

            <Link
              component={RouterLink}
              to="/signup"
              sx={{ alignSelf: "center", mt: 1 }}
            >
              Don't have an account yet? Sign Up
            </Link>
          </Box>
        </Paper>
      </Container>
     </Box>
  );
}