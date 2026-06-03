import api from "./HttpInterceptor.js";

const API_URL = "http://localhost:8080/api/recommendations";

export const generateRecommendations =
    async (payload) => {

        const response =
            await api.post(
                `${API_URL}/generate`,
                payload,
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

        return response.data;
    };

export const getMyPreferences =
    async () => {

        const response =
            await api.get(
                `${API_URL}/preferences/me`,
            );

        return response.data;
    };

export const getLastRecommendations =
    async () => {

        const response =
            await api.get(
                "/api/recommendations/last"
            );

        return response.data;
    };