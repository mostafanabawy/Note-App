import { createContext, useState } from "react";


export let UserContext = createContext(null);
export default function UserProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    return <UserContext.Provider value={{token,setToken}}>
        {children}
    </UserContext.Provider>
}





