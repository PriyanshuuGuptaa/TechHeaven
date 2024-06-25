import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";

export const ProtectedRoute=()=>{
    if(!token){
        return <Navigate to ="/login" />;
    }
    return <Outlet/>;
};