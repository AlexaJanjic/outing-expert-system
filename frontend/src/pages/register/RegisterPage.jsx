import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stack
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../services/authService.js"

function RegisterPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [backendError, setBackendError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateField = (name, value) => {
        let error = "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch (name) {

            case "username":
                if (!value.trim()) {
                    error = "Username is required";
                } else if (value.length < 3) {
                    error = "Username must contain at least 3 characters";
                }
                break;

            case "email":
                if (!value.trim()) {
                    error = "Email is required";
                } else if (!emailRegex.test(value)) {
                    error = "Invalid email format";
                }
                break;

            case "password":
                if (value.length < 4) {
                    error = "Password must contain at least 4 characters";
                }
                break;

            case "confirmPassword":
                if (value !== formData.password) {
                    error = "Passwords do not match";
                }
                break;
        }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const isFormValid = () => {
        return (
            formData.username.trim().length >= 3 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
            formData.password.length >= 4 &&
            formData.password === formData.confirmPassword
        );
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setBackendError("");
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate("/");
        } catch (error) {
            setBackendError(
                error.response.data.message
            );
        }
    };

    const textFieldSx = {
        "& .MuiFormHelperText-root": {color: "#f87171"},
        "& .MuiOutlinedInput-root": {
            color: "white",
            borderRadius: 3,
            background: "rgba(255,255,255,0.04)",
            "& fieldset": {borderColor: "rgba(255,255,255,0.15)"},
            "&:hover fieldset": { borderColor: "#6366f1"},
            "&.Mui-focused fieldset": { borderColor: "#8b5cf6"}
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 3,
                background: "radial-gradient(circle at 20% 20%, #1e3a8a 0%, #0f172a 60%)"
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: 500,
                    p: 5,
                    borderRadius: 4,
                    backdropFilter: "blur(14px)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
                }}
            >
                <Stack spacing={3}>
                    <Box textAlign="center">
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{
                                color: "white",
                                letterSpacing: "-0.5px"
                            }}
                        >
                            🌙 NightOut
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.6)",
                                mt: 1
                            }}
                        >
                            Create your account
                        </Typography>
                    </Box>

                    <form onSubmit={handleRegister}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={(e) =>
                                    validateField(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                error={!!errors.username}
                                helperText={errors.username}
                                InputLabelProps={{style: { color: "rgba(255,255,255,0.7)"}}}
                                sx={textFieldSx}
                            />
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={(e) =>
                                    validateField(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                error={!!errors.email}
                                helperText={errors.email}
                                InputLabelProps={{style: { color: "rgba(255,255,255,0.7)"}}}
                                sx={textFieldSx}
                            />
                            <TextField
                                fullWidth
                                type="password"
                                name="password"
                                label="Password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={(e) =>
                                    validateField(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                error={!!errors.password}
                                helperText={errors.password}
                                InputLabelProps={{style: { color: "rgba(255,255,255,0.7)"}}}
                                sx={textFieldSx}
                            />
                            <TextField
                                fullWidth
                                type="password"
                                name="confirmPassword"
                                label="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={(e) =>
                                    validateField(
                                        e.target.name,
                                        e.target.value
                                    )
                                }
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                InputLabelProps={{style: { color: "rgba(255,255,255,0.7)"}}}
                                sx={textFieldSx}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                disabled={!isFormValid()}
                                sx={{
                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    color: "white",
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                        boxShadow: "0 12px 30px rgba(99,102,241,0.6)"
                                    }
                                }}
                            >
                                Register
                            </Button>
                            {
                                backendError && (
                                    <Typography
                                        color="error"
                                        sx={{
                                            mt: 2,
                                            textAlign: "center"
                                        }}
                                    >
                                        {backendError}
                                    </Typography>

                                )
                            }
                        </Stack>
                    </form>

                    <Typography
                        textAlign="center"
                        sx={{
                            color: "rgba(255,255,255,0.7)"
                        }}
                    >
                        Already have an account?{" "}
                        <Link
                            to="/"
                            style={{
                                color: "#a5b4fc",
                                textDecoration: "none",
                                fontWeight: 600
                            }}
                        >
                            Login
                        </Link>
                    </Typography>

                </Stack>
            </Paper>
        </Box>
    );
}

export default RegisterPage;