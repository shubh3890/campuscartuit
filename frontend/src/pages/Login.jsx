import React from 'react'
import { SignIn } from '@clerk/clerk-react';
const Login = () => {
  return (
    <div className='min-h-screen p-6 flex flex-col md:flex-row gap-4 '>
    
    <img src="/bg.png" alt="" className=' absolute top-0 z-0 left-0 object-cover h-full w-full ' />
    <div className=' flex-1 flex flex-col'>
      <h1 className='text-xl md:text-2xl  font-bold  text-blue-800 font-mono '>CampusCart</h1>
      <h1 className="md:text-5xl text-3xl mt-25 pb-2 leading-15 font-bold font-sans bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent">
  BUY | SELL | DONATE | LOST & FOUND
</h1>

<p className="text-xl md:text-3xl text-indigo-900 max-w-72 md:max-w-md font-serif">
  your campus your cart ...
</p>

    </div>
    <div className='flex-1 flex  items-center justify-between p-6 sm:p-10'>
      <SignIn/>
    </div>
      
    </div>
  )
}

export default Login
