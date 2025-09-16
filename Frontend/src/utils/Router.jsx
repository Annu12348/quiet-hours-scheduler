import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AddBlock from '../pages/AddBlock'
import UpdateBlock from '../pages/UpdateBlock'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/crete-block' element={<AddBlock />} />
      <Route path='/Update-block' element={<UpdateBlock />} />
    </Routes>
  )
}

export default Router
