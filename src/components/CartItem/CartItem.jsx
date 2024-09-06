import React, { useState, useEffect } from 'react';
import SpinnerOverlay from './../SpinnerOverlay/SpinnerOverlay';

export default function CartItem({ ele, updateCount, removeItem, isLoading }) {
    const [localLoading, setLocalLoading] = useState(false);

    const handleUpdateCount = (newCount) => {
        setLocalLoading(true);
        updateCount(ele.product.id, newCount).finally(() => setLocalLoading(false));
    };

    const handleRemoveItem = () => {
        setLocalLoading(true);
        removeItem(ele.product.id).finally(() => setLocalLoading(false));
    };

    return (
        <>
            <tr key={ele._id} className="border-b my-4  ">
                {localLoading && <SpinnerOverlay />}
                <td className="p-4 w-56">
                    <img src={ele.product.imageCover} className="w-full md:w-48 max-w-full max-h-full" alt={ele.product.title} />
                </td>
                <td className="font-semibold text-gray-900 dark:text-white ">
                    <h5 className='text-xl font-medium mb-1'>{ele.product.title}</h5>
                    <h5 className='text-lg font-medium mb-1'>{ele.price} EGP</h5>
                    <button onClick={handleRemoveItem}>
                        <i className="fa-solid fa-trash text-red-700"></i> <span className="font-medium text-red-700 dark:text-red-500 hover:underline">Remove</span>
                    </button>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                        <button onClick={() => handleUpdateCount(ele.count + 1)} className="inline-flex items-center justify-center rounded-md h-8 w-8 text-gray-500 bg-transparent border green-border focus:outline-none hover:bg-green-100">
                            <span className="sr-only">Increase quantity</span>
                            <svg className="w-2 h-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                        <span className='px-3'>{ele.count}</span>
                        <button onClick={() => handleUpdateCount(ele.count - 1)} className="inline-flex items-center justify-center rounded-md h-8 w-8 text-gray-500 bg-transparent border green-border focus:outline-none hover:bg-green-100" disabled={ele.count === 1}>
                            <span className="sr-only">Decrease quantity</span>
                            <svg className="w-2 h-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
