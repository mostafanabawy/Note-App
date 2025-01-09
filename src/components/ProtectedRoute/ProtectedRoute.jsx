import { useContext } from "react"
import { UserContext } from "../../context/User/User.context"
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {
    const {token} = useContext(UserContext);
    console.log(token);

    if (!token) {
        return <Navigate to="/login" />
    }else{
        return <>
            {children}
        </>
    }

  
}

export default ProtectedRoute
