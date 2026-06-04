import {
    AppBar,
    Toolbar,
    Box,
    Button
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

function TopBar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(99, 102, 241, 0.15)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.15)"
            }}
        >

            <Toolbar
                sx={{
                    width: "100%",
                    minHeight: "80px !important",
                    px: 3
                }}
            >

                <Box
                    component="img"
                    src={logo}
                    alt="NightOut"
                    onClick={() => navigate("/home")}
                    sx={{
                        height: 60,
                        cursor: "pointer",
                        transition: "0.3s",
                        filter: "drop-shadow(0 0 20px rgba(139,92,246,0.5))",
                        "&:hover": { transform: "scale(1.05)"}
                    }}
                />

                <Box sx={{ flexGrow: 1 }} />

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        mr: 5
                    }}
                >

                    <Button
                        onClick={() => navigate("/home")}
                        sx={{
                            color: "white",
                            px: 3,
                            borderRadius: 3,
                            background: "rgba(255,255,255,0.06)",
                            "&:hover": { background: "rgba(255,255,255,0.12)"}
                        }}
                    >
                        Home
                    </Button>

                    <Button
                        onClick={() => navigate("/search")}
                        sx={{
                            color: "white",
                            px: 3,
                            borderRadius: 3,
                            background: "rgba(255,255,255,0.06)",
                            "&:hover": { background: "rgba(255,255,255,0.12)"}
                        }}
                    >
                        Search
                    </Button>

                    <Button
                        onClick={handleLogout}
                        sx={{
                            px: 3,
                            borderRadius: 3,
                            color: "white",
                            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                            boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                            "&:hover": { background: "linear-gradient(135deg,#4f46e5,#7c3aed)"}
                        }}
                    >
                        Logout
                    </Button>

                </Box>

            </Toolbar>

        </AppBar>

    );
}

export default TopBar;