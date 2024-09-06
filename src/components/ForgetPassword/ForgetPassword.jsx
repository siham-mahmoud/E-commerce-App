import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay'; 
import { Helmet } from 'react-helmet';

export default function ForgotPassword() {
  const [apiErr, setApiErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); 

  function forgetPass(values) {
    setIsLoading(true);
    const { email } = values;


    localStorage.setItem('userEmail', email);

    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email })
      .then(() => {
        setApiErr(null);
        navigate('/verfiyCode'); 
      })
      .catch((err) => {
        setApiErr('Something went wrong/this email is not valid, please try again.'); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const myForm = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required')
    }),
    onSubmit: forgetPass 
  });

  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Forget password</title>
               
            </Helmet>
      {isLoading && <SpinnerOverlay />} 

      <form className="w-9/12 mx-auto" onSubmit={myForm.handleSubmit}>
        <h2 className="text-3xl font-medium mb-4">Forgot Password:</h2>
        
        {apiErr && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiErr}</span>
          </div>
        )}
        
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.email}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
            placeholder="name@example.com"
          />
          {myForm.errors.email && myForm.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{myForm.errors.email}</span>
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Reset Password
        </button>
      </form>
    </>
  );
}
