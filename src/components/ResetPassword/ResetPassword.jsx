import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(/^[A-Z][a-z0-9]{3,8}/, 'Password must start with an uppercase letter and be 4 to 9 characters long, containing only lowercase letters and digits'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    }),
    onSubmit: (values) => {
      resetPass(values.newPassword);
    }
  });

  function resetPass(newPassword) {
    setIsLoading(true);
    axios
      .put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        newPassword
      })
      .then(() => {
        setIsLoading(false);
        setRedirectToLogin(true);
      })
      .catch(() => {
        setIsLoading(false);
        formik.setErrors({ submit: 'Failed to reset password. Please try again.' });
      });
  }

  useEffect(() => {
    if (redirectToLogin) {
      navigate('/login');
    }
  }, [redirectToLogin, navigate]);

  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Reset password</title>
               
            </Helmet>
      {isLoading && <SpinnerOverlay />}
      
      <form className="w-9/12 mx-auto" onSubmit={formik.handleSubmit}>
        <h2 className="text-3xl font-medium mb-4">Set New Password:</h2>

        {formik.errors.submit && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.submit}</span>
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
           className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            {...formik.getFieldProps('newPassword')}
           className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-400 focus:shadow-sm"
            placeholder="Enter new password"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...formik.getFieldProps('confirmPassword')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Confirm new password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.confirmPassword}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}
