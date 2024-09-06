import React from 'react';
import error from '../../assets/images/4042.png';

import { Helmet } from 'react-helmet';

export default function NotFound() {
  
    return (
      <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>NotFound</title>
               
            </Helmet>
     
        <div className='flex justify-center items-center  overflow-hidden mt-48'>
            <img src={error} alt="404 Not Found" className='max-w-96 max-h-full' />
      
        </div>
        </>
    );
}
