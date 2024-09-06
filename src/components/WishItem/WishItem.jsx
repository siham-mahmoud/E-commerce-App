import React, { useState } from 'react';
import SpinnerOverlay from './../SpinnerOverlay/SpinnerOverlay';

export default function WishItem({ ele, removeItem, addToCart, showAction = true }) {
    const [loading, setLoading] = useState(false);

    const handleRemove = async (id) => {
        setLoading(true);
        try {
            await removeItem(id);
        } catch (error) {
            console.error("Failed to remove item", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (id) => {
        setLoading(true);
        try {
            await addToCart(id); 
            await removeItem(id); 
        } catch (error) {
            console.error("Failed to add item to cart", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <SpinnerOverlay />}
            <tr key={ele._id} className="border-b my-4 relative">
                <td className="p-4 w-56">
                    <img src={ele.imageCover} className="w-16 md:w-48 max-w-full max-h-full" alt={ele.title} />
                </td>
                <td className="font-semibold text-gray-900 dark:text-white">
                    <h5 className='text-xl font-medium mb-1'>{ele.title}</h5>
                    <h5 className='text-lg font-medium mb-1'>{ele.price} EGP</h5>
                    {showAction && (
                        <button
                            onClick={() => handleRemove(ele._id)}
                            disabled={loading}
                            className="relative mr-2"
                        >
                            <i className="fa-solid fa-trash text-red-700"></i>
                            <a href="#" className="font-medium text-red-700 dark:text-red-500 hover:underline">Remove</a>
                        </button>
                    )}
                </td>
                <td>
                    <div className="flex items-center justify-end">
                        <button
                            onClick={() => handleAddToCart(ele._id)}
                            disabled={loading}
                            className="bg-transparent border m-3 green-border capitalize w-50 py-2 px-4 rounded-lg text-xl hover:bg-zinc-200"
                        >
                            Add to Cart
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
}
