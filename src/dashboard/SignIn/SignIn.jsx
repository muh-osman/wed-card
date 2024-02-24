import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <RouterLink
        style={{ color: "#00000099" }}
        to="/"
        onMouseEnter={(e) => (e.target.style.color = "#1976d2")}
        onMouseLeave={(e) => (e.target.style.color = "#00000099")}
      >
        Tsmim Seham
      </RouterLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#707171",
    },
    secondary: {
      main: "#6f685c",
    },
  },
});

export default function SignIn() {
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (email === "admin@mail.com" && password === "00266321@zxc") {
      localStorage.setItem("auth", "true");

      nav("/dashboard", { replace: true });
    } else {
      alert("Email or password incorrect");
    }

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  const authState = localStorage.getItem("auth");

  return authState ? (
    <Navigate to="/dashboard" />
  ) : (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs" dir="ltr">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#707171" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#b6ac9a",
                "&:hover": { bgcolor: "#6f685c" },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
