import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userTokenContext } from '../../context/UserTokenContext';
import { cartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

export default function Navbar() {
  let { token, setToken } = useContext(userTokenContext);
  let { cartItemsNo, getCart } = useContext(cartContext);
  let { wishlistItems, get } = useContext(WishlistContext);
  
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  useEffect(() => {
    if (token && getCart) {
      setLoading(true);
      getCart().then(cart => {
        setLoading(false);
      }).catch(error => {
        setLoading(false); 
        console.error("Failed to fetch cart items:", error);
      });
    }
  }, [token, getCart]);

  function logout() {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('wishlistItems');

    navigate('/login');
  }

  return (
    <nav className="bg-gray-50 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to='home' className="flex items-center space-x-3 rtl:space-x-reverse">
          <i className='fa-solid fa-cart-shopping nav-icon'></i>
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Fresh Cart</span>
        </NavLink>
        <div className="flex md:order-2 space-x-3 md:space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            onClick={toggleNav}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isNavOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          {token ? (
            <>
              <div className='me-3 relative'>
                <div className='cart-color absolute py-1 rounded-md px-2 bottom-5 start-5 text-white text-xs'>
                  {loading ? (
                    <i className='fa fa-spinner fa-spin'></i>
                  ) : (
                    cartItemsNo
                  )}
                </div>
                <i className='fa-solid fa-cart-shopping text-3xl mr-3'></i>
              </div>
              <NavLink to='login' onClick={logout} className="text-neutral-500">LogOut</NavLink>
            </>
          ) : null}
        </div>
        <div className={`items-center justify-between hidden md:flex md:w-auto md:order-1 ${isNavOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          {token ? (
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-normal border rounded-lg md:space-x-0 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <NavLink to='' className="block py-2 px-2 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Home</NavLink>
              </li>
              <li>
                <NavLink to='cart' className="block py-2 px-2 text-neutral-500 visited:text-black rounded md:bg-transparent" aria-current="page">Cart</NavLink>
              </li>
              <li>
                <NavLink to='wishlist' className="block py-2 px-2 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Wish List</NavLink>
              </li>
              <li>
                <NavLink to='recentProduct' className="block py-2 px-2 text-neutral-500 visited:text-black rounded md:bg-transparent" aria-current="page">Products</NavLink>
              </li>
              <li>
                <NavLink to='category' className="block py-2 px-3 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Categories</NavLink>
              </li>
              <li>
                <NavLink to='brands' className="block py-2 px-3 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Brand</NavLink>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isNavOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
        {token ? (
          <ul className="flex flex-col p-4 font-normal border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <NavLink to='' className="block py-2 px-2 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Home</NavLink>
            </li>
            <li>
              <NavLink to='cart' className="block py-2 px-2 text-neutral-500 visited:text-black rounded md:bg-transparent" aria-current="page">Cart</NavLink>
            </li>
            <li>
              <NavLink to='wishlist' className="block py-2 px-2 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Wish List</NavLink>
            </li>
            <li>
              <NavLink to='recentProduct' className="block py-2 px-2 text-neutral-500 visited:text-black rounded md:bg-transparent" aria-current="page">Products</NavLink>
            </li>
            <li>
              <NavLink to='category' className="block py-2 px-3 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Categories</NavLink>
            </li>
            <li>
              <NavLink to='brands' className="block py-2 px-3 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Brand</NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col p-4 font-normal border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <NavLink to='register' className="block py-2 px-2 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Register</NavLink>
            </li>
            <li>
              <NavLink to='login' className="block py-2 px-2 text-neutral-500 rounded md:bg-transparent visited:text-black" aria-current="page">Login</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
