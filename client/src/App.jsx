import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo } from './assets' // mtlb ki assets se jo bhi aa rha ho usme se logo nikal lo
import { Home, CreatePost } from './pages'
import './darkTheme.css'


// start from backend
const App = () => {

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <BrowserRouter>
    
    <header className={`"w-full flex justify-between items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]" ${
        isToggled ? 'bg-gray-800' : 'bg-light'
      }`}>

        <Link to="/">
          <img src={logo} alt='logo' className='w-28 object-contain' />
        </Link>

        

        <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md' >
          Create</Link>
      </header>

      <main className={`sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)] ${
        isToggled ? 'bg-gray-800  text-white' : 'bg-light'
      }`}>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />

        </Routes>
      </main>
      
    </BrowserRouter>
  )
}

export default App


