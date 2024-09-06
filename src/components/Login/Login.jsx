import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userTokenContext } from '../../context/UserTokenContext';
import { Helmet } from 'react-helmet';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay'; 

export default function Login() {
    const [apiErr, setApiErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const navigate = useNavigate();
    const { setToken, convertToken } = useContext(userTokenContext);

    const login = (formValue) => {
        setApiErr(null);
        setIsLoading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValue)
            .then((res) => {
                const { data } = res;
                if (data.message === 'success') {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    convertToken();
                    setIsFormSubmitted(true);
                    setTimeout(() => {
                        navigate('/home'); 
                    }, 2000);
                } else {
                    setApiErr("Unexpected response format");
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setApiErr(err.response?.data?.message || "An error occurred");
                setIsLoading(false);
            });
    };

    const myForm = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: login
    });

    const handleForgotPasswordRedirect = () => {
        setIsRedirecting(true); 
        setTimeout(() => {
            navigate('/forgot'); 
            setIsRedirecting(false);
        }, 1000); 
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
            {isLoading && <SpinnerOverlay />} 
            {isRedirecting && <SpinnerOverlay />} {/* Show loader for redirect */}

            <div className="mt-20 min-h-screen">
             
                <form className="w-9/12 mx-auto" onSubmit={myForm.handleSubmit}>
                    <h2 className='text-3xl font-medium mb-4'>Login Now:</h2>
                    {apiErr && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{apiErr}</span>
                        </div>
                    )}
                    
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email:</label>
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
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password:</label>
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
                      
                 <div className='flex justify-between'>
                

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={handleForgotPasswordRedirect}
                            className="text-black  font-medium text-xl hover:text-green-500"
                        >
                            Forgot your password?
                        </button>
                    </div>
                    <div> 
                        <button
                        type="submit"
                        disabled={isLoading}
                        className={`text-lg w-full sm:w-auto px-5 py-2.5 rounded-lg focus:ring-4 focus:outline-none  text-center dark:focus:ring-blue-800 ${
                            myForm.isValid && myForm.dirty
                                ? 'bg-green-500 text-white'
                                : 'bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                    >
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Login Now'}
                    </button></div>
                 </div>
                </form>
            </div>
        </>
    );
}
