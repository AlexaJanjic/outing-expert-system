import api from "./HttpInterceptor.js";


export const generateRecommendations = async (payload) => {

        const response = await api.post(
                "api/recommendations/generate",
                payload,
            );
        return response.data;
    };

export const getMyPreferences = async () => {

        const response = await api.get(
                "api/recommendations/preferences/me",
            );
        return response.data;
    };

export const getLastRecommendations = async () => {

        const response = await api.get(
                "/api/recommendations/last"
            );
        return response.data;
    };