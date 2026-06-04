import api from "./HttpInterceptor.js";

export const searchVenues = async (payload) => {

    const response =  await api.post(
        "/api/search",
        payload,
    );
    return response.data;
}