import {
    Box,
    Paper,
    Typography,
    Stack,
    Chip,
    Grid,
    Button,
    LinearProgress,
    CircularProgress
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TopBar from "../../components/TopBar.jsx";
import { getVenue } from "../../services/VenueService.js";
import {EventTypeLabels} from "../../models/eventtype.js";

function VenueDetailsPage() {

const { id } = useParams();

const navigate = useNavigate();

const [venue, setVenue] = useState(null);

const [loading, setLoading] = useState(true);

const cardStyle = {
    p: 4,
    borderRadius: 4,
    backdropFilter: "blur(14px)",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
};

useEffect(() => {

    const loadVenue = async () => {

        try {

            const response = await getVenue(id);

            setVenue(response);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    loadVenue();

}, [id]);

const renderFeature = (label, value) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
    >
        {
            value
                ? <CheckCircleIcon color="success" />
                : <CancelIcon color="error" />
        }

        <Typography
            sx={{
                color: "white"
            }}
        >
            {label}
        </Typography>
    </Stack>
);

const renderRating = (label, value) => (
    <Box>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
            }}
        >
            <Typography
                sx={{
                    color: "white"
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    color: "rgba(255,255,255,0.75)"
                }}
            >
                {value}/10
            </Typography>
        </Box>
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
            }}
        >
            <LinearProgress
                variant="determinate"
                value={value * 10}
                sx={{
                    flex: 1,
                    height: 10,
                    borderRadius: 5
                }}
            />


        </Box>

    </Box>
);

if (loading) {
    return (
        <>
            <TopBar />

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                        "radial-gradient(circle at 20% 20%, #1e3a8a 0%, #0f172a 60%)"
                }}
            >
                <CircularProgress
                    size={70}
                />
            </Box>
        </>
    );
}

if (!venue) {
    return (
        <>
            <TopBar />

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                        "radial-gradient(circle at 20% 20%, #1e3a8a 0%, #0f172a 60%)"
                }}
            >
                <Typography
                    color="white"
                    variant="h4"
                >
                    Venue not found
                </Typography>
            </Box>
        </>
    );
}

return (
    <>
        <TopBar />

        <Box
            sx={{
                minHeight: "100vh",
                px: 3,
                py: 5,
                background:
                    "radial-gradient(circle at 20% 20%, #1e3a8a 0%, #0f172a 60%)"
            }}
        >
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: "auto"
                }}
            >

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{
                        color: "white",
                        mb: 3
                    }}
                >
                    Back
                </Button>

                <Paper
                    elevation={0}
                    sx={{
                        ...cardStyle,
                        mb: 4
                    }}
                >
                    <Box>

                        <Typography
                            variant="h2"
                            fontWeight={800}
                            sx={{
                                color: "white",
                                mb: 2
                            }}
                        >
                            {venue.name}
                        </Typography>

                        {(venue.trending || venue.crowded) && (
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    mb: 2
                                }}
                            >
                                {venue.trending && (
                                    <Chip
                                        label="🔥 Trending"
                                        sx={{
                                            color: "white",
                                            background: "#f59e0b",
                                            fontWeight: 600
                                        }}
                                    />
                                )}

                                {venue.crowded && (
                                    <Chip
                                        label="👥 Crowded Now"
                                        sx={{
                                            color: "white",
                                            background: "#ef4444",
                                            fontWeight: 600
                                        }}
                                    />
                                )}
                            </Stack>
                        )}

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.65)",
                                mt: 1
                            }}
                        >
                            Average Price: {venue.averagePrice}
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.65)"
                            }}
                        >
                            Capacity: {venue.capacity}
                        </Typography>

                    </Box>
                </Paper>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr"
                        },
                        gap: 3
                    }}
                >

                    <Paper
                        elevation={0}
                        sx={{
                            ...cardStyle,
                            minHeight: 250
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            sx={{ color: "white", mb: 3 }}
                        >
                            🎵 Music
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            {venue.supportedMusic?.map(music => (
                                <Chip
                                    key={music}
                                    label={music}
                                    sx={{
                                        color: "white",
                                        background: "rgba(99,102,241,0.75)",
                                        border: "1px solid #8b5cf6",
                                        fontWeight: 500
                                    }}
                                />
                            ))}
                        </Stack>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            ...cardStyle,
                            minHeight: 250
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            sx={{ color: "white", mb: 3 }}
                        >
                            🎉 Events
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            {venue.events?.map(event => (
                                <Chip
                                    key={event}
                                    label={EventTypeLabels[event] || event}
                                    sx={{
                                        color: "white",
                                        background: "rgba(99,102,241,0.75)",
                                        border: "1px solid #8b5cf6",
                                        fontWeight: 500
                                    }}
                                />
                            ))}
                        </Stack>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            ...cardStyle,
                            minHeight: 350
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            sx={{ color: "white", mb: 3 }}
                        >
                            ⭐ Features
                        </Typography>

                        <Grid container spacing={2} columnSpacing={10}>

                            <Grid item xs={6} >
                                <Stack
                                    spacing={8}
                                    justifyContent="space-between"
                                    sx={{
                                        height: "100%"
                                    }}
                                >
                                    {renderFeature("Premium Service", venue.premiumService)}
                                    {renderFeature("Outdoor Seating", venue.outdoorSeating)}
                                    {renderFeature("Games Available", venue.gamesAvailable)}
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack
                                    spacing={8}
                                    justifyContent="space-between"
                                    sx={{
                                        height: "100%"
                                    }}
                                >
                                    {renderFeature("Private Tables", venue.privateTables)}
                                    {renderFeature("Quality Food", venue.qualityFood)}
                                    {renderFeature("Sports Streaming", venue.sportsStreaming)}
                                </Stack>
                            </Grid>

                        </Grid>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            ...cardStyle,
                            minHeight: 350
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            sx={{ color: "white", mb: 3 }}
                        >
                            📊 Venue Ratings
                        </Typography>

                        <Stack spacing={3}>
                            {renderRating("Atmosphere", venue.atmosphereLevel)}
                            {renderRating("Comfort", venue.comfortLevel)}
                            {renderRating("Service", venue.serviceLevel)}
                            {renderRating("Social", venue.socialLevel)}
                            {renderRating("Noise", venue.noiseLevel)}
                        </Stack>
                    </Paper>

                </Box>
            </Box>
        </Box>
    </>
);


}

export default VenueDetailsPage;
