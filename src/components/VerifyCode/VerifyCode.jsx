import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay'; 
import { Helmet } from 'react-helmet';

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiErr, setApiErr] = useState(null);
  const navigate = useNavigate(); 


  function verifyResetCode(values) {
    const { resetCode } = values;
    setIsLoading(true); 
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode })
      .then(() => {
        setApiErr(null);
        navigate('/resetPassword'); 
      })
      .catch(() => {
        setApiErr("Failed to verify reset code. Please try again");
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }


  const myForm = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required('Reset code is required')
    }),
    onSubmit: verifyResetCode
  });

  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Verify code</title>
               
            </Helmet>
      {isLoading && <SpinnerOverlay />} 
      
      <form className="w-9/12 mx-auto" onSubmit={myForm.handleSubmit}>
        <h2 className='text-3xl font-medium mb-4'>Reset Password:</h2>

        {apiErr && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{apiErr}</span>
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter your reset code
          </label>
          <input
            type="text"
            id="resetCode"
            onBlur={myForm.handleBlur}
            onChange={myForm.handleChange}
            value={myForm.values.resetCode}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your reset code"
          />
          {myForm.errors.resetCode && myForm.touched.resetCode && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{myForm.errors.resetCode}</span>
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Verify Reset Code
        </button>
      </form>
    </>
  );
}
