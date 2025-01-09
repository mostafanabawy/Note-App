import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/User/User.context"

function GuestRoute({ children }) {
    const { token } = useContext(UserContext);

    if (token) {
        return <Navigate to="/" />;
    } else {
        return <>
            {children};
        </>
    }

}

export default GuestRoute
