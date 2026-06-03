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
import {login} from "../../services/authService.js";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin =
        async (e) => {
            e.preventDefault();
            try {
                const response = await login({username, password});

                localStorage.setItem("token", response.token);
                localStorage.setItem("user",JSON.stringify(response.user));

                navigate("/home");

            } catch (error) {
                setError(error.response?.data?.message
                    || error.response?.data
                    || error.message
                    || "Login failed"
                );
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
                    width: 450,
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
                            }}>
                            🌙 NightOut
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.6)",
                                mt: 1
                            }}>
                            Discover the best nightlife
                            tailored to your preferences
                        </Typography>
                    </Box>

                    <form onSubmit={handleLogin}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                InputLabelProps={{
                                    style: {
                                        color: "rgba(255,255,255,0.7)"
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                        borderRadius: 3,
                                        background: "rgba(255,255,255,0.04)",
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.15)"},
                                        "&:hover fieldset": { borderColor: "#6366f1"},
                                        "&.Mui-focused fieldset": { borderColor: "#8b5cf6"}
                                    }
                                }}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                InputLabelProps={{
                                    style: { color: "rgba(255,255,255,0.7)"}
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                        borderRadius: 3,
                                        background: "rgba(255,255,255,0.04)",
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.15)"},
                                        "&:hover fieldset": { borderColor: "#6366f1"},
                                        "&.Mui-focused fieldset": { borderColor: "#8b5cf6"}
                                    }
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
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
                                }}>
                                Login
                            </Button>
                            {
                                error && (
                                    <Typography
                                        color="error"
                                        textAlign="center"
                                    >
                                        {error}
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
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            style={{
                                color: "#a5b4fc",
                                textDecoration: "none",
                                fontWeight: 600
                            }}
                        >
                            Register
                        </Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}

export default LoginPage;