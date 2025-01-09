import { Link } from "react-router-dom"
function Sidebar() {
    return <>
        <div className="h-screen fixed left-0 top-[72px] bg-neutral-800 text-center p-5 w-1/6">
            <h2 className="text-white text-2xl space-x-2 mb-5">
                <i className="fa-regular fa-note-sticky text-cyan-400"></i>
                <span>Notes</span>
            </h2>
            <ul>
                <li>
                    <Link to={'/'} className="text-white">
                        Home
                    </Link>
                </li>
            </ul>
        </div>
    </>
}

export default Sidebar
