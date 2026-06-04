import api from "./HttpInterceptor.js";

export const getVenue = async (id) => {
    const response = await api.get(`api/venues/${id}`);
    return response.data;
}

export const getTrendingVenues = async () =>{
    const response = await api.get("api/trending");
    return response.data;
}