import api from "./HttpInterceptor.js";
import {jwtDecode} from "jwt-decode";


export const register = async (registerData) => {

    const response = await api.post(
            "api/auth/register",
            registerData
        );
    return response.data;
};

export const login = async (loginData) => {
        const response = await api.post(
                "api/auth/login",
                loginData
            );
        return response.data;
    };

export const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if(!token){
        return false;
    }
    try{
        const decoded = jwtDecode(token);
        const now = new Date() / 1000;
        return decoded.exp > now;
    }catch {
        return false;
    }
}