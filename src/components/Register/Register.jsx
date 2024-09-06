import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay'; 

export default function Register() {
    const [apiErr, setApiErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false); 
    const navigate = useNavigate();

    const register = (formValue) => {
        setApiErr(null);
        setIsLoading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValue)
            .then((res) => {
                const { data } = res;
                if (data.message === 'success') {
                    setIsLoading(false);
                    setIsRedirecting(true); 
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000); 
                }
            })
            .catch((err) => {
                setApiErr(err.response?.data?.message || "An error occurred");
                setIsLoading(false);
            });
    };

    const myForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, "Not less than 3").max(10, "Max is 10").required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/,'Password must start with an uppercase letter and be 4 to 9 characters long, containing only lowercase letters and digits').required("Required"),
            rePassword: Yup.string().oneOf([Yup.ref('password')], "Must match the password").required("Required"),
            phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone number is not valid').required("Required")
        }),
        onSubmit: register
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
            {(isLoading || isRedirecting) && <SpinnerOverlay />} {/* Show loader for both loading and redirect */}

            <div className="flex justify-center items-center min-h-screen">
                <form className="w-9/12 mx-auto" onSubmit={myForm.handleSubmit}>
                    <h2 className='text-3xl font-medium mb-4'>Register Now:</h2>
                    {apiErr && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{apiErr}</span>
                        </div>
                    )}
                    
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input
                            type="text"
                            id="name"
                            onBlur={myForm.handleBlur}
                            onChange={myForm.handleChange}
                            value={myForm.values.name}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
                            placeholder="Your name"
                        />
                        {myForm.errors.name && myForm.touched.name && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{myForm.errors.name}</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                            type="email"
                            id="email"
                            onBlur={myForm.handleBlur}
                            onChange={myForm.handleChange}
                            value={myForm.values.email}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
                            placeholder="name@email.com"
                        />
                        {myForm.errors.email && myForm.touched.email && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{myForm.errors.email}</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            type="password"
                            id="password"
                            onBlur={myForm.handleBlur}
                            onChange={myForm.handleChange}
                            value={myForm.values.password}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
                            placeholder="**********"
                        />
                        {myForm.errors.password && myForm.touched.password && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{myForm.errors.password}</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-enter password</label>
                        <input
                            type="password"
                            id="rePassword"
                            onBlur={myForm.handleBlur}
                            onChange={myForm.handleChange}
                            value={myForm.values.rePassword}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
                            placeholder="**********"
                        />
                        {myForm.errors.rePassword && myForm.touched.rePassword && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{myForm.errors.rePassword}</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                        <input
                            type="tel"
                            id="phone"
                            onBlur={myForm.handleBlur}
                            onChange={myForm.handleChange}
                            value={myForm.values.phone}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
                            placeholder="Your phone"
                        />
                        {myForm.errors.phone && myForm.touched.phone && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">{myForm.errors.phone}</span>
                            </div>
                        )}
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            disabled={isLoading || !myForm.isValid || !myForm.dirty}
                            className={`text-lg w-full sm:w-auto px-5 py-2.5 rounded-lg focus:ring-4 focus:outline-none text-center dark:focus:ring-blue-800 ${
                                myForm.isValid && myForm.dirty
                                    ? 'bg-green-500 text-white'
                                    : 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                        >
                            {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Register Now'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
