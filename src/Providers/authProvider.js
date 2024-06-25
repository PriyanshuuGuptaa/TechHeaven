import React, { createContext, useContext, useEffect, useState } from 'react';
import TechHeavenProducts from '../backend/db2/TechHeavenproducts';
import axios from 'axios';

    const authContext=createContext();
            const AuthProvider=({children})=>{
                const [token,setToken_]=useState(localStorage.getItem("token"))
               const  setToken=(newToken)=>{
                    setToken_(newToken);
                };
                useEffect(()=>{
                    if(token){
                    axios.defaults.headers.common["Authorization"]="Bearer"+token;
                    localStorage.setItem("token",token);
                    }
                    else{
                        delete axios.defaults.headers.common["Authorization"];
                        localStorage.removeItem("token");
                    }
                },[token]);
                const contextValue = useMemo(
                    () => ({
                      token,
                      setToken,
                    }),
                    [token]
                  );
    return (
        <authContext.Provider value={contextValue}>{children}</authContext.Provider>
    );
            }


export const useAuth=()=>{
    return useContext(authContext);
};
 export default AuthProvider;