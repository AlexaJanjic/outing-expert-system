import {Navigate} from 'react-router-dom';
import {isTokenValid} from "../services/authService.js";

function ProtectedRoute({children}){
    if(!isTokenValid()){
        localStorage.removeItem("token");

        return(<Navigate to="/" replace/>);
    }
    return children;
}

export default ProtectedRoute;