import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:cate" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </>
  )
}

export default App
