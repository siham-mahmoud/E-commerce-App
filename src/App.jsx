import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider,useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import CounterContextProvider from './context/CounterContext'
import UserTokenContext from './context/UserTokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProtectedUserRoutes from './components/ProtectedUserRoutes/ProtectedUserRoutes';
import CartContextProvider, { cartContext } from './context/CartContext';
import WishlistContextProvider from './context/WishlistContext';
import SpinnerOverlay from './components/SpinnerOverlay/SpinnerOverlay';
import LayOut from './components/LayOut/LayOut';
import Order from './components/Order/Order'
let Register =lazy(()=>import('./components/Register/Register'))
let Checkout =lazy(()=>import('./components/Checkout/Checkout'))

let ProductDetails=lazy(()=>import('./components/ProductDetails/ProductDetails'))
let Cart=lazy(()=>import('./components/Cart/Cart'))
let Home=lazy(()=>import ('./components/Home/Home'))
let Login=lazy(()=>import ('./components/Login/Login'))
let WishList=lazy(()=>import('./components/WishList/WishList'))
let Brands=lazy(()=>import ('./components/Brands/Brands'))
let RecentProduct=lazy(()=>import('./components/RecentProduct/RecentProduct'))
let CategoryCard=lazy(()=>import ('./components/CategoryCard/CategoryCard'))
let VerifyCode=lazy(()=>import('./components/VerifyCode/VerifyCode'))
let ResetPassword =lazy(()=>import('./components/ResetPassword/ResetPassword'))
let ForgotPassword =lazy(()=>import('./components/ForgetPassword/ForgetPassword'))
let Categories=lazy(()=>import('./components/Categories/Categories'))
let NotFound =lazy(()=>import ('./components/NotFound/NotFound'))
function App() {


  const [count, setCount] = useState(0);
  let{getCart,setcartItemsNo}=useContext(cartContext);
    let x= createBrowserRouter([
    {path:"", element:<LayOut/>,children:[
      { index:true ,element: <ProtectedUserRoutes><Login/></ProtectedUserRoutes>},
      {path:'login',element:<ProtectedUserRoutes>  <Suspense  fallback={<SpinnerOverlay/>}>
      <Login/>
    </Suspense></ProtectedUserRoutes>},
      {path:'home',element:<ProtectedRoutes>
        <Suspense  fallback={<SpinnerOverlay/>}>
          <Home/>
        </Suspense>
      </ProtectedRoutes>},
      {path:'register',element:<ProtectedUserRoutes><Suspense fallback={<SpinnerOverlay/>}><Register/></Suspense></ProtectedUserRoutes>},
      {path:'productDetails/:id/:cat',element:<ProtectedRoutes><Suspense fallback={<SpinnerOverlay/>}><ProductDetails/></Suspense></ProtectedRoutes>},
      {path:'cat',element:<ProtectedRoutes><Suspense fallback={<SpinnerOverlay/>}><Categories/></Suspense></ProtectedRoutes>},
      {path:'cart',element:<ProtectedRoutes><Suspense fallback={<SpinnerOverlay/>}><Cart/></Suspense></ProtectedRoutes>},
      {path:'checkout/:cartId',element:<ProtectedRoutes><Suspense fallback={<SpinnerOverlay/>}><Checkout/></Suspense></ProtectedRoutes>},
   
    {path:'allorders',element:<ProtectedRoutes><Order/></ProtectedRoutes>},
      {path:'resetPassword',element: <ProtectedUserRoutes> <Suspense fallback={<SpinnerOverlay/>}><ResetPassword/><Suspense/></Suspense></ProtectedUserRoutes>},
  
    
      {path:'wishlist',element:<ProtectedRoutes>
        <Suspense  fallback={<SpinnerOverlay/>}>
          <WishList/>
        </Suspense>
      </ProtectedRoutes>},
       {path:'verfiyCode',element:<ProtectedUserRoutes>
        <Suspense  fallback={<SpinnerOverlay/>}>
          <VerifyCode/>
        </Suspense>
      </ProtectedUserRoutes>},
       {path:'forgot',element:<ProtectedUserRoutes>
        <Suspense  fallback={<SpinnerOverlay/>}>
          <ForgotPassword/>
        </Suspense>
      </ProtectedUserRoutes>},
       {path:'recentProduct',element:<ProtectedRoutes>
        <Suspense  fallback={<SpinnerOverlay/>}>
          <RecentProduct/>
        </Suspense>
      </ProtectedRoutes>},
          {path:'brands',element:<ProtectedRoutes>
            <Suspense  fallback={<SpinnerOverlay/>}>
              <Brands/>
            </Suspense>
          </ProtectedRoutes>},
            {path:'category',element:<ProtectedRoutes>
              <Suspense  fallback={<SpinnerOverlay/>}>
                <CategoryCard/>
              </Suspense>
            </ProtectedRoutes>},
      {path:'*',element: <Suspense fallback={<SpinnerOverlay/>}><NotFound/></Suspense>}

    ]
    },
    
   

   ])



   async function getCartInfo(){
    let res= await getCart();
 
    setcartItemsNo(res.numOfCartItems)
 }
   useEffect(()=>{
    getCartInfo()
  },[])
 


  return (
   
    <UserTokenContext>
    <CounterContextProvider>
    <Toaster />
   <WishlistContextProvider>
    <RouterProvider router={x}></RouterProvider>
    </WishlistContextProvider>
  
    </CounterContextProvider> 
    </UserTokenContext>
    
  )
}

export default App
