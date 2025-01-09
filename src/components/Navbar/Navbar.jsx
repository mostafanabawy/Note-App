import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from './../../context/User/User.context';

function Navbar() {
    const { token, setToken } = useContext(UserContext);
    return <>
        <nav className="flex justify-between bg-cyan-400 p-5 fixed z-10 left-0 right-0 top-0">
            <h1 className="text-2xl">
                <Link to={"/"}>
                    <i className="fa-regular fa-note-sticky text-black me-2"></i>
                    Notes
                </Link>
            </h1>
            <ul className="flex gap-3">
                <li>
                    {
                        token ? <button className="text-lg" onClick={()=>{ setToken(null); localStorage.setItem('token', null);}}>Logout</button>
                            : <Link to={'/login'} className="text-lg">
                                Login
                            </Link>
                    }
                </li>
                <li>
                    {
                        !token && <Link to={'/signup'} className="text-lg">
                            Signup
                        </Link>
                    }
                </li>
            </ul>
        </nav>

    </>
}

export default Navbar
