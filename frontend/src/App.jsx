import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CheckoutPage from './pages/CheckoutPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import OrderDetails from './pages/OrderDetails'
import AdminOrders from './pages/AdminOrders'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:cate" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order-success/:id" element={<OrderSuccessPage />} />
        <Route path="/order/user/:id" element={<OrderDetails admin={false}/>} />
        <Route path="/order/admin/:id" element={<OrderDetails admin={true}/>} />
        <Route path="/admin/orders" element={<AdminOrders />} />




      </Routes>
    </>
  )
}

export default App
