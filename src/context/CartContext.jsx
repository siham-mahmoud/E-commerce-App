import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let cartContext = createContext();

export default function CartContextProvider({ children }) {
  let [cartId, setCartId] = useState([]);
  const [cartItemsNo, setcartItemsNo] = useState([]);
  const [lastAddedId, setLastAddedId] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null); 

  useEffect(() => {
    if (token) {
      getCart(); 
    }
  }, [token]);

  const getHeaders = () => ({
    token: localStorage.getItem("token"),
  });

  function addProductToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: getHeaders() }
      
      )
      .then((response) => response.data,setLastAddedId(productId)
    )
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  function getCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers: getHeaders() })
      .then((response) => {
        setcartItemsNo(response.data.numOfCartItems);
        return response.data;
      })
      .catch((err) => {
        console.error(err);
        return err.response?.data || err;
      });
  }

  function removeProduct(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: getHeaders() })
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        return err.response?.data || err;
      });
  }

  function updateProductCount(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: getHeaders() }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        return err.response?.data || err;
      });
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() })
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        return err.response?.data || err;
      });
  }

  function cashOnDelivery(url, shippingAddress) {
    return axios
      .post(url, { shippingAddress }, { headers: getHeaders() })
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        return err.response?.data || err;
      });
  }

  function getOrders(userId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        headers: getHeaders(),
      })
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        return err.response?.data || err;
      });
  }

  return (
    <cartContext.Provider
      value={{
        lastAddedId,
        setLastAddedId,
        cartItemsNo,
        setcartItemsNo,
        cartId,
        setCartId,
        addProductToCart,
        getCart,
        getOrders,
        removeProduct,
        updateProductCount,
        clearCart,
        cashOnDelivery,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
