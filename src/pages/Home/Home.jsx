import { useState, useContext, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"
import Modal from "../../components/Modal/Modal"
import { UserContext } from './../../context/User/User.context';
import axios from 'axios';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = useContext(UserContext);
    const [notes, setNotes] = useState(null);
    const [editNote, setEditNote] = useState(null);
    async function displayNotes() {
        const options = {
            url: "https://note-sigma-black.vercel.app/api/v1/notes",
            method: "GET",
            headers: {
                token: `3b8ny__${token}`
            }
        }
        const { data } = await axios(options);
        console.log(data);
        setNotes(data.notes);
    }
    async function deleteNote(id) {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
            method: "DELETE",
            headers: {
                token: `3b8ny__${token}`
            }
        }
        const { data } = await axios(options);
        console.log(data);
        displayNotes();
    }
    useEffect(() => {
        displayNotes();
    }, [])
    return <>
        <section>
            <Sidebar />
            <div className="min-h-screen flex mt-24 items-start justify-end me-5">
                <div className="grow ps-72 mt-20 grid grid-cols-1 md:grid-cols-2 l:grid-cols-4 xl:ps-80">
                    {notes && notes.map(note => (
                        <div key={note._id} className="px-4  py-3 border-b-2 shadow-md m-2 bg-white">
                            <h2 className="text-3xl font-semibold w-full">{note.title}</h2>
                            <p>{note.content}</p>

                            <button className="text-yellow-500 text-2xl px-1 py-1 mt-1 rounded hover:text-yellow-600" 
                            onClick={()=>{setIsModalOpen(true); setEditNote( {content: note.content, title: note.title, _id: note._id} ) } }>
                                <i className="fa-solid fa-pen-to-square fs-4 text-warning me-3"></i>
                            </button>
                            <button className="text-red-500 text-2xl px-1 py-1 mt-1 rounded hover:text-red-600" onClick={()=>{deleteNote(note._id)}}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>

                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Note
                </button>

                <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); setEditNote(null)}}  display={displayNotes} edit={editNote}/>
            </div>
        </section>
    </>
}

export default Home
