import {
    Box,
    Paper,
    Typography,
    Stack,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Chip
} from "@mui/material";

import logo from "../assets/logo.png";
import { MusicType } from "../models/musictype.js";
import { EventType } from "../models/eventtype.js";
import {useEffect, useState} from "react";
import {generateRecommendations, getLastRecommendations, getMyPreferences} from "../services/recommendationService.js";
import {EventTypeLabels} from "../models/eventtype.js";
import TopBar from "../components/TopBar.jsx";
import {useNavigate} from "react-router-dom";
import {getTrendingVenues} from "../services/venueService.js";

function HomePage() {

    const [selectedMusic, setSelectedMusic] = useState([]);

    const [selectedEventTypes, setSelectedEventTypes] = useState([]);

    const [budget, setBudget] = useState("");

    const [likesCrowd, setLikesCrowd] = useState(false);

    const [error, setError] = useState("");

    const musicOptions = Object.values(MusicType);

    const eventOptions = Object.values(EventType);

    const [recommendations, setRecommendations] = useState([]);

    const [lastRecommendations, setLastRecommendations] = useState([]);

    const [trendingVenues, setTrendingVenues] = useState([]);


    const loadPreferences = async () => {

        try {
            const preferences = await getMyPreferences();

            if (!preferences) { return;}

            setSelectedMusic( preferences.preferredMusic || []);

            setSelectedEventTypes( preferences.preferredEventTypes || []);

            setBudget( preferences.budget || 0);

            setLikesCrowd( preferences.likesCrowd || false);
        } catch (error) {
            console.error(error);
        }
    };

    const loadLastRecommendations = async () => {
        const data = await getLastRecommendations();
        setLastRecommendations(data.recommendations);
        console.log(data);
    };

    const loadTrendingVenues = async () => {
        const data = await getTrendingVenues();
        setTrendingVenues(data);
        console.log(data, " ---123123");
    }
    const navigate = useNavigate();

    useEffect(() => {
        loadPreferences();
        loadLastRecommendations();
        loadTrendingVenues();
    }, [navigate]);

    const handleMusicChange = (music) => {

        if (selectedMusic.includes(music)) {

            setSelectedMusic( selectedMusic.filter( m => m !== music));
        } else {
            setSelectedMusic([
                ...selectedMusic,
                music
            ]);

        }
    };

    const handleEventTypeChange = (eventType) => {

        if (selectedEventTypes.includes(eventType)) {

            setSelectedEventTypes(
                selectedEventTypes.filter(
                    e => e !== eventType
                )
            );
        } else {
            setSelectedEventTypes([
                ...selectedEventTypes,
                eventType
            ]);

        }
    };

    const handleGenerate = async () => {
        if (selectedMusic.length === 0) {

            setError( "Select at least one music preference.");
            return;
        }

        setError("");

        let finalBudget =
            budget === ""
                ? 0
                : Number(budget);

        if (finalBudget < 0 || finalBudget > 100000) {
            finalBudget = 0;
        }
        const payload = {
            preferredMusic: selectedMusic,
            preferredEventTypes: selectedEventTypes,
            budget: finalBudget,
            likesCrowd
        };

        try {
            const response = await generateRecommendations(payload);
            setRecommendations(response);
            console.log(response)
        } catch(error){
            console.log(error);
        }
    };

    const cardStyle = {
        p: 4,
        borderRadius: 4,
        backdropFilter: "blur(14px)",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
    };

    return (
        <>

            <TopBar/>

            <Box
                sx={{
                    minHeight: "100vh",
                    px: 3,
                    py: 5,
                    background: "radial-gradient(circle at 20% 20%, #1e3a8a 0%, #0f172a 60%)"
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1000,
                        mx: "auto"
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            color: "white"
                        }}
                    >
                        Welcome back 👋
                    </Typography>

                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.65)",
                            mt: 1,
                            mb: 4
                        }}
                    >
                        Find your perfect night out.
                    </Typography>

                    <Stack spacing={4}>

                        <Paper
                            elevation={0}
                            sx={cardStyle}
                        >
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{
                                    color: "white",
                                    mb: 4
                                }}
                            >
                                🎵 Your Preferences
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 6,
                                    alignItems: "stretch"
                                }}
                            >

                                <Box
                                    sx={{
                                        flex: 1
                                    }}
                                >
                                    <Stack spacing={3}>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "white",
                                                    mb: 1
                                                }}
                                            >
                                                Music
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                flexWrap="wrap"
                                            >
                                                {
                                                    musicOptions.map(music => (
                                                        <Chip
                                                            key={music}
                                                            label={music}
                                                            clickable
                                                            onClick={() =>
                                                                handleMusicChange(music)
                                                            }
                                                            sx={{
                                                                mb: 1,
                                                                color: "white",
                                                                background: selectedMusic.includes(music) ? "#6366f1" : "rgba(255,255,255,0.08)",
                                                                border: selectedMusic.includes(music) ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.15)",
                                                                "&:hover": { background: selectedMusic.includes(music) ? "#4f46e5" : "rgba(255,255,255,0.15)" }
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </Stack>
                                        </Box>

                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "white",
                                                    mb: 1
                                                }}
                                            >
                                                Event Types
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                flexWrap="wrap"
                                            >
                                                {
                                                    eventOptions.map(eventType => (
                                                        <Chip
                                                            key={eventType}
                                                            label={EventTypeLabels[eventType]}
                                                            clickable
                                                            onClick={() => handleEventTypeChange(eventType)}
                                                            sx={{
                                                                mb: 1,
                                                                color: "white",
                                                                background: selectedEventTypes.includes(eventType) ? "#6366f1" : "rgba(255,255,255,0.08)",
                                                                border: selectedEventTypes.includes(eventType) ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.15)",
                                                                "&:hover": { background: selectedEventTypes.includes(eventType) ? "#4f46e5": "rgba(255,255,255,0.15)" }
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </Stack>
                                        </Box>

                                        <TextField
                                            label="Budget"
                                            type="number"
                                            value={budget}
                                            onChange={(e) => setBudget(e.target.value)}
                                            InputLabelProps={{style: { color:"rgba(255,255,255,0.7)"}}}
                                            sx={{
                                                width: 250,
                                                "& .MuiOutlinedInput-root": {
                                                    color: "white",
                                                    background: "rgba(255,255,255,0.04)",
                                                    "& fieldset": { borderColor: "rgba(255,255,255,0.15)"}
                                                }
                                            }}
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={likesCrowd}
                                                    onChange={(e) => setLikesCrowd(e.target.checked)}
                                                />
                                            }
                                            label="I like crowded places"
                                            sx={{
                                                color: "white"
                                            }}
                                        />

                                        <Button
                                            onClick={handleGenerate}
                                            sx={{
                                                width: 280,
                                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                                color: "white",
                                                py: 1.5,
                                                borderRadius: 3,
                                                fontWeight: 600,
                                                textTransform: "none",
                                                boxShadow: "0 8px 24px rgba(99,102,241,0.4)"
                                            }}
                                        >
                                            Generate Recommendations
                                        </Button>

                                        {
                                            error && (
                                                <Typography
                                                    color="error"
                                                >
                                                    {error}
                                                </Typography>
                                            )
                                        }

                                    </Stack>
                                </Box>

                                <Box
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "100%"
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={logo}
                                        alt="NightOut Logo"
                                        sx={{
                                            width: "100%",
                                            maxWidth: 500,
                                            objectFit: "contain",
                                            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.5))"
                                        }}
                                    />
                                </Box>

                            </Box>
                        </Paper>

                        {
                            recommendations.length > 0 && (
                                <Paper
                                    elevation={0}
                                    sx={cardStyle}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{
                                            color: "white",
                                            mb: 3
                                        }}
                                    >
                                        🎯 Recommended Venues
                                    </Typography>

                                    <Stack spacing={2}>
                                        {
                                            recommendations.map((venue, index) => (
                                                    <Box
                                                        key={index}
                                                        onClick={() => navigate(`/venues/${venue.id}`)}
                                                        sx={{
                                                            p: 2,
                                                            borderRadius: 3,
                                                            background: "rgba(255,255,255,0.05)",
                                                            cursor: "pointer",
                                                            transition: "0.2s",
                                                            "&:hover": { background: "rgba(255,255,255,0.08)"}
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: "white",
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            {venue.venueName}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                color: "rgba(255,255,255,0.6)"
                                                            }}
                                                        >
                                                            Score: {venue.finalScore}
                                                        </Typography>
                                                    </Box>
                                                )
                                            )
                                        }
                                    </Stack>
                                </Paper>
                            )
                        }

                        {
                            lastRecommendations.length > 0 && (
                                <Paper
                                    elevation={0}
                                    sx={cardStyle}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{
                                            color: "white",
                                            mb: 3
                                        }}
                                    >
                                        ⭐ Last Recommendations
                                    </Typography>

                                    <Stack spacing={2}>
                                        {
                                            lastRecommendations.map((venue, index) => (
                                                    <Box
                                                        key={index}
                                                        onClick={() => navigate(`/venues/${venue.venueId}`)}
                                                        sx={{
                                                            p: 2,
                                                            borderRadius: 3,
                                                            background: "rgba(255,255,255,0.05)"
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: "white",
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            {venue.venueName}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                color: "rgba(255,255,255,0.6)"
                                                            }}
                                                        >
                                                            Score: {venue.score}
                                                        </Typography>
                                                    </Box>
                                                )
                                            )
                                        }
                                    </Stack>
                                </Paper>
                            )
                        }

                        {
                            trendingVenues.length > 0 && (
                                <Paper
                                    elevation={0}
                                    sx={cardStyle}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{
                                            color: "white",
                                            mb: 3
                                        }}
                                    >
                                        🔥 Trending Venues
                                    </Typography>

                                    <Stack spacing={2}>
                                        {
                                            trendingVenues.map((venue, index) => (
                                                <Box
                                                    key={index}
                                                    onClick={() => navigate(`/venues/${venue.id}`)}
                                                    sx={{
                                                        p: 2,
                                                        borderRadius: 3,
                                                        background: "rgba(255,255,255,0.05)",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: "white",
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {venue.venueName}
                                                    </Typography>
                                                </Box>
                                            ))
                                        }
                                    </Stack>
                                </Paper>
                            )
                        }

                    </Stack>
                </Box>
            </Box>
        </>
    );
}

export default HomePage;