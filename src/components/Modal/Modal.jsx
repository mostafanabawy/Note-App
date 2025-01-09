import { useContext, useEffect } from "react";
import { UserContext } from './../../context/User/User.context';
import axios from "axios";
import { useFormik } from "formik";
import { object, string } from 'yup';

export default function Modal({ isOpen, onClose, display, edit }) {
    const { token } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            title: "",
            content: ""
        },
        validationSchema: object({
            title: string().required("Title is required"),
            content: string().required("Content is required")
        }),
        onSubmit: async (values) => {
            if (edit) {
                await updateNote(values);
            } else {
                await addNote(values);
            }
            formik.resetForm();
        }
    })
    useEffect(() => {
        if (edit) {
            formik.setValues({
                title: edit.title,
                content: edit.content
            });
        }else{
            formik.resetForm();
        }
        console.log("edit" ,edit);
    }, [edit]);
    async function addNote(values) {
        try {
            const options = {
                url: "https://note-sigma-black.vercel.app/api/v1/notes",
                method: "POST",
                headers: {
                    token: `3b8ny__${token}`
                },
                data: values
            }
            console.log(options);
            const { data } = await axios.request(options);
            console.log(data);
            await display();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    async function updateNote(values) {
        const options = {
            url: `https://note-sigma-black.vercel.app/api/v1/notes/${edit._id}`,
            method: "PUT",
            headers: {
                token: `3b8ny__${token}`
            },
            data: values
        }
        try {
            const { data } = await axios.request(options);
            console.log(data);
            await display();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    if (!isOpen) return null; // Do not render if modal is not open
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-semibold">Add a Note</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-black">
                        ×
                    </button>
                </div>
                <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the note title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                    </div>
                    {/* Content Input */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows="4"
                            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the note content"
                            onChange={formik.handleChange}
                            value={formik.values.content}
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


