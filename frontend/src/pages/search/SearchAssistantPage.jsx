import {
    Box,
    Paper,
    Typography,
    Button,
    Stack,
    Grid,
    Chip,
    Stepper,
    Step,
    StepLabel, CircularProgress
} from "@mui/material";

import { useState} from "react";
import TopBar from "../../components/TopBar.jsx"
import {goals} from "../../data/goals.js";
import {goalQuestions} from "../../data/goalQuestions.js";
import {searchVenues} from "../../services/SearchService.js";
import {questionLabels} from "../../data/goalQuestionsLabels.js";
import ReplayIcon from "@mui/icons-material/Replay";
import {useNavigate} from "react-router-dom";

function SearchAssistantPage() {

    const [activeStep, setActiveStep] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [results, setResults] = useState([]);
    const [,setLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();
    const steps = [
        "Choose Goal",
        "Questions",
        "Analysis",
        "Results"
    ];
    const cardStyle = {
        p: 4,
        borderRadius: 4,
        backdropFilter: "blur(14px)",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)"
    };

    const handleGoalSelect = (goal) => {
        setSelectedGoal(goal);
        setActiveStep(1);
    };

    const handleAnalyze = async () => {
        try{
            setLoading(true);
            setActiveStep(2)

            const payload = {
                goal: selectedGoal.id,
                answers: answers
            }

            const response = await searchVenues(payload);

            if (response.length === 0) {
                setNoResults(true);
                setResults([]);
            } else {
                setNoResults(false);
                setResults(response);
            }

            setTimeout(() => {
                setActiveStep(3);
            }, 2000);

        }catch (error){
            console.log(error);
        }finally {
            setLoading(false);
        }

    };

    const questions = selectedGoal ? goalQuestions[selectedGoal.id] : [];
    const allQuestionsAnswered = questions.length > 0 && questions.every(question => answers[question.id]);

    return (
        <>
            <TopBar />

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
                        maxWidth: 1200,
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
                        🧠 Search Assistant
                    </Typography>

                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.65)",
                            mt: 1,
                            mb: 5
                        }}
                    >
                        Tell us what you're trying to achieve tonight.
                    </Typography>

                    <Paper
                        elevation={0}
                        sx={{
                            ...cardStyle,
                            mb: 4
                        }}
                    >
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                        >
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>
                                        {step}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>

                    {activeStep === 0 && (
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
                                What is your goal tonight?
                            </Typography>

                            <Grid
                                container
                                spacing={3}
                            >
                                {goals.map((goal) => (
                                    <Grid
                                        key={goal.title}
                                        size={{
                                            xs: 12,
                                            md: 4
                                        }}
                                    >
                                        <Paper
                                            onClick={() =>
                                                handleGoalSelect(goal)
                                            }
                                            sx={{
                                                p: 4,
                                                height: 220,
                                                cursor: "pointer",
                                                borderRadius: 4,
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                transition: "0.25s",
                                                "&:hover": {
                                                    transform: "translateY(-6px)",
                                                    background: "rgba(99,102,241,0.15)"
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="h2"
                                            >
                                                {goal.icon}
                                            </Typography>

                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                sx={{
                                                    color: "white",
                                                    mt: 2
                                                }}
                                            >
                                                {goal.title}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "rgba(255,255,255,0.6)",
                                                    mt: 1
                                                }}
                                            >
                                                {goal.description}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    )}

                    {activeStep === 1 && (
                        <Paper
                            elevation={0}
                            sx={cardStyle}
                        >
                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{
                                    color: "white",
                                    mb: 1
                                }}
                            >
                                {selectedGoal?.icon}{" "}
                                {selectedGoal?.title}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.6)",
                                    mb: 4
                                }}
                            >
                                Help us understand your situation.
                            </Typography>

                            <Stack spacing={4}>
                                <Box>

                                    <Stack
                                        spacing={1}
                                        flexWrap="wrap"
                                    >
                                        {
                                            questions.map(question => (

                                                <Box key={question.id}>

                                                    <Typography
                                                        sx={{
                                                            color: "white",
                                                            mb: 2
                                                        }}
                                                    >
                                                        {question.question}
                                                    </Typography>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        flexWrap="wrap"
                                                    >
                                                        {
                                                            question.options.map(option => (

                                                                <Chip
                                                                    key={option}
                                                                    label={option}
                                                                    clickable
                                                                    onClick={() =>
                                                                        setAnswers({
                                                                            ...answers,
                                                                            [question.id]: option
                                                                        })
                                                                    }
                                                                    sx={{
                                                                        mb: 1,
                                                                        color: "white",
                                                                        background: answers[question.id] === option ? "#6366f1" : "rgba(255,255,255,0.08)",
                                                                        border: answers[question.id] === option ? "1px solid #8b5cf6" : "1px solid rgba(255,255,255,0.15)",
                                                                        "&:hover": { background: answers[question.id] === option ? "#4f46e5" : "rgba(255,255,255,0.15)"
                                                                        }
                                                                    }}
                                                                />

                                                            ))
                                                        }
                                                    </Stack>

                                                </Box>

                                            ))
                                        }
                                    </Stack>
                                </Box>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        onClick={() => {
                                            setActiveStep(0);
                                            setSelectedGoal(null);
                                            setAnswers({});
                                            setResults([]);
                                        }}
                                        sx={{
                                            color: "white",
                                            border: "1px solid rgba(255,255,255,0.2)"
                                        }}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        onClick={handleAnalyze}
                                        disabled={!allQuestionsAnswered}
                                        sx={{
                                            width: 250,
                                            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                            color: "white",
                                            py: 1.5,
                                            borderRadius: 3,
                                            "&.Mui-disabled": {
                                                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                                opacity: 0.4,
                                                color: "white"
                                            }
                                        }}
                                    >
                                        Analyze Goal
                                    </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    )}

                    {activeStep === 2 && (
                        <Paper
                            elevation={0}
                            sx={{
                                ...cardStyle,
                                textAlign: "center"
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "white"
                                }}
                            >
                                🧠 Analyzing...
                            </Typography>

                            <CircularProgress
                                size={60}
                                sx={{
                                    mt: 3,
                                    mb: 3,
                                    color: "#8b5cf6"
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.6)",
                                    mt: 2
                                }}
                            >
                                Building goal tree and
                                reasoning backwards.
                            </Typography>
                        </Paper>
                    )}

                    {activeStep === 3 && (
                        <Stack spacing={4}>
                            <Paper
                                elevation={0}
                                sx={cardStyle}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 3
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                        sx={{
                                            color: "white"
                                        }}
                                    >
                                        🎯 Recommended Venues
                                    </Typography>

                                    <Button
                                        endIcon={<ReplayIcon />}
                                        onClick={() => {
                                            setActiveStep(0);
                                            setSelectedGoal(null);
                                            setAnswers({});
                                            setResults([]);
                                            setNoResults(false);
                                        }}
                                        variant="outlined"
                                        sx={{
                                            color: "white",
                                            borderColor: "rgba(255,255,255,0.2)"
                                        }}
                                    >
                                        Search Again
                                    </Button>
                                </Box>

                                {noResults ? (

                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 4,
                                            textAlign: "center",
                                            background: "rgba(255,255,255,0.05)",
                                            borderRadius: 3
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: "white",
                                                mb: 2
                                            }}
                                        >
                                            😕 No Venues Found
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "rgba(255,255,255,0.7)"
                                            }}
                                        >
                                            No venues match your preferences. Try adjusting your answers or selecting a different goal.
                                        </Typography>
                                    </Paper>

                                ) : (

                                    <Stack spacing={2}>
                                        {results.map((venue) => (

                                            <Box
                                                key={venue.venueId}
                                                onClick={() => navigate(`/venues/${venue.venueId}`)}
                                                sx={{
                                                    p: 3,
                                                    borderRadius: 3,
                                                    background: "rgba(255,255,255,0.05)",
                                                    cursor: "pointer",
                                                    transition: "0.2s",
                                                    "&hover": {
                                                        background: "rgba(255,255,255,0.8)"
                                                    }
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "white",
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {venue.venueName}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        color: "rgba(255,255,255,0.7)",
                                                        mb: 2
                                                    }}
                                                >
                                                    Match: {venue.score.toFixed(0)}%
                                                </Typography>

                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    flexWrap="wrap"
                                                >
                                                    {venue.requirements
                                                        .sort((a, b) =>
                                                            Number(b.satisfied) -
                                                            Number(a.satisfied)
                                                        )
                                                        .map((req) => (
                                                            <Chip
                                                                key={req.questionId}
                                                                label={
                                                                    questionLabels[
                                                                        req.questionId
                                                                        ]
                                                                }
                                                                sx={{
                                                                    color: "white",
                                                                    border: req.satisfied ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(239,68,68,0.5)",
                                                                    "& .MuiChip-label": {px: 1}
                                                                }}
                                                                icon={
                                                                    <span
                                                                        style={{
                                                                            color: req.satisfied ? "#22c55e" : "#ef4444",
                                                                            fontWeight: "bold"
                                                                        }}
                                                                    >
                                                                        {req.satisfied ? "✓" : "✗"}
                                                                    </span>
                                                                }
                                                            />
                                                        ))}
                                                </Stack>
                                            </Box>

                                        ))}
                                    </Stack>

                                )}
                            </Paper>
                        </Stack>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default SearchAssistantPage;