import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './page/Home.jsx'
import Category from './page/Category.jsx'
import Product from './page/Product.jsx'
import Checkout from './page/Checkout.jsx'
import Cart from './page/Cart.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>,
        
      },
      {
        path: 'categories/:slug',
        element:<Category/>
      },
      {
        path: 'products/:slug',
        element:<Product />
      },
      {
        path: 'products/checkout',
        element:<Checkout/>
      },
      {
        path: 'products/cart',
        element:<Cart />
      }

      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
   </React.StrictMode>, 
)
