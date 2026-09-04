import { Box, Button, Container, Paper, TextField,Typography,IconButton,} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [signupSucceeded, setSignupSucceeded] = useState(false);

  const formik = useFormik<SignUpData>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost:5098/api/UserId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Signup failed");
          return;
        }

        console.log("Signup successful:", data);

        setSignupSucceeded(true);
        alert("Account created successfully!");
        navigate("/dashboard");

      } catch (error) {
        console.error("Signup request failed:", error);
        alert("Signup failed. Please try again.");
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
            Sign Up
          </Typography>

          {signupSucceeded ? (
            <Typography color="success.main">
              Account created successfully. Redirecting...
            </Typography>
          ) : (
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
                formik.touched.email &&
                Boolean(formik.errors.email)
              }
              helperText={
                formik.touched.email &&
                formik.errors.email
              }
            />

            <TextField
              label="Create your password"
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
                formik.touched.password &&
                formik.errors.password
              }
            />

           
            <TextField
              label="Confirm password"
              type="password"
              fullWidth
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
              }
            />

            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={formik.isSubmitting}
            >
              

              {formik.isSubmitting ? "Creating Account..." : "Sign up"
            
              }
            </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}