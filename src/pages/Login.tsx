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

    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost:5098/api/UserId/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Login failed.");
          return;
        }

        console.log("Login response:", data);

        alert(data.message);

       
        navigate("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        alert("Unable to connect to the server.");
      }
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

          <Box
            component="form"
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
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && Boolean(formik.errors.email)
              }
              helperText={
                formik.touched.email ? formik.errors.email : ""
              }
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password
                  ? formik.errors.password
                  : ""
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                alignSelf: "center",
                mt: 1,
              }}
            >
              Don't have an account yet? Sign Up
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}