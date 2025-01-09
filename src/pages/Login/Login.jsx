
import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { UserContext } from './../../context/User/User.context';
function Login() {
    const navigate = useNavigate();
    let [err, setErr] = useState("");
    const {setToken} = useContext(UserContext)
    async function loginUser(values) {
        try {
            const options = {
                url: "https://note-sigma-black.vercel.app/api/v1/users/signIn",
                method: 'POST',
                data: values
            }
            const { data } = await axios(options)
            if (data.msg === "done") {
                toast.success("login successful! Welcome");
                setToken(data.token);
                localStorage.setItem("token", data.token);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setErr(error.response.data.msg)
        }

    }
    const schema = object({
        email: string().email("Invalid email address").required("Email is required"),
        password: string().required("Password is required")
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            loginUser(values);
        }
    })
    return <>
        <section className='w-1/3 mx-auto p-3 shadow-lg mt-5 bg-slate-50'>
            <h2 className="text-3xl font-semibold text-center mb-5">Login Now</h2>
            <form onSubmit={formik.handleSubmit} className='space-y-3'>
                {err && <p className="text-sm text-red-600 text-center">{err}</p>}
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

                <button type='submit' className='w-full my-1 rounded-md text-white bg-cyan-400'>login</button>
                <p className='text-sm'>Don{`'`}t have an account yet? <Link to={'/signup'} className='underline text-cyan-700'>Sign up</Link></p>
            </form>
        </section>
    </>
}

export default Login
