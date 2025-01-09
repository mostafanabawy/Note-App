import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"


function Layout() {
    return <>
        <main className="h-screen bg-stone-100 overflow-hidden">  
            <Navbar />
            <Outlet />
        </main>
    </>
}

export default Layout
