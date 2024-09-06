import React from 'react';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay'; 

function BrandModal({ isVisible, onClose, brandData, isLoading }) {
  if (!isVisible) return null;

  return (
   <>


<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    
        {isLoading ? (
        
            <SpinnerOverlay />
        
        ) : (
          <div className="relative p-6  bg-white rounded shadow-lg w-3/4 max-w-md">
            <button
    onClick={onClose}
    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
  >
  <i className="fa-solid fa-x"></i>
  </button>
              <div className="relative z-20 mt-6 flex-grow">
            
            {brandData ? (
              <div>
                 <div className='grid  grid-cols-2    justify-center items-center border-b border-t'>
              <div>   <h3 className="text-xl font-semibold mb-2">{brandData.name}</h3>
              <p>{brandData.slug || 'No description available.'}</p></div>
                <img src={brandData.image} alt={brandData.name} className="w-full h-40 object-cover mb-4" />
             
              </div>
             <div className='flex justify-end'>
             <button
                  onClick={onClose}
                  className=" block mt-4 bg-slate-500 text-white py-2 px-4 rounded-md "
                >
                  Close
                </button>
             </div>
              </div>
             
            ):<SpinnerOverlay/>}
          </div>
        </div>
        )}
      </div>
   
   </>
  );
}

export default BrandModal;
