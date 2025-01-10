import { useFormik } from "formik";
import axios from 'axios';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { number, object, string } from 'yup';


function Signup() {
    const navigate = useNavigate();
    let [err, setErr] = useState("")
    async function submitUser(values) {
        try {
            const options = {
                url: "https://note-sigma-black.vercel.app/api/v1/users/signUp",
                method: "POST",
                data: values
            }
            const { data } = await axios.request(options);
            if (data.msg === "done") {
                toast.success("user registered ! please login with your new account");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setErr(error.response.data.msg)
        }
    }
    const schema = object({
        name: string().required("Name is required").min(3, "Name can't be less than 3 characters"),
        email: string().email("Invalid email address").required("Email is required"),
        password: string().required("Password is required")
            .min(8, "Password should be at least 8 characters long")
            .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
        age: number().required("Age is required").integer("Age must be a whole number").min(18, "You must be at least 18 years old"),
        phone: string().required("Phone number is required").matches(/^01[0125][0-9]{8}$/, "Invalid phone number format")
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            phone: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            submitUser(values);
        }
    })
    return <>
        <section className='w-1/3 mx-auto p-5 shadow-lg mt-40 bg-slate-50 pb-10'>
            <h2 className="text-3xl font-semibold text-center mb-5">Signup Now</h2>
            <form onSubmit={formik.handleSubmit} className='space-y-3'>
                {err && <p className="text-sm text-red-600 text-center">{err}</p>}
                <input type="text" name="name" onChange={formik.handleChange} className="w-full rounded-md px-2 border-2"
                    placeholder="Enter your Name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur} />
                {formik.touched.name && formik.errors.name && <p className="text-sm text-red-600">{formik.errors.name}</p>}

                <input type="email" name="email" onChange={formik.handleChange} className="w-full rounded-md px-2 border-2"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email && <p className="text-sm text-red-600">{formik.errors.email}</p>}

                <input type="password" name="password" onChange={formik.handleChange} className="w-full rounded-md px-2 border-2"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password && <p className="text-sm text-red-600">{formik.errors.password}</p>}

                <input type="tel" name="phone" onChange={formik.handleChange} className="w-full rounded-md px-2 border-2"
                    placeholder="Enter your Phone"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur} />
                {formik.touched.phone && formik.errors.phone && <p className="text-sm text-red-600">{formik.errors.phone}</p>}

                <input type="number" name="age" onChange={formik.handleChange} className="w-full rounded-md px-2 border-2"
                    placeholder="Enter your age"
                    value={formik.values.age}
                    onBlur={formik.handleBlur} />
                {formik.touched.age && formik.errors.age && <p className="text-sm text-red-600">{formik.errors.age}</p>}

                <button type="submit" className="w-full my-1 rounded-md text-white bg-cyan-400">Sign up</button>
            </form>
        </section>
    </>
}

export default Signup
