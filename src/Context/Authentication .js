import {createContext, useCallback, useState} from "react";

const AuthContext =createContext({})

export const Authentication = ({children})=>{
    const [user,setUser]=useState({})
    const [token,setToken]=useState("")
    const setAuthUser = useCallback((user)=>setUser(user),[]);
    const setUserToken = useCallback((token)=>setUser(token),[]);
    return(
        <AuthContext.Provider value={{user,setAuthUser,token,setUserToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;