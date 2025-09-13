import React from 'react'
import { NavLink } from 'react-router-dom'
import {Home,MessageCircle,Search,User} from 'lucide-react'
const MenuItems = ({setSidebarOpen}) => {
  return (
    <div className='px-6 text-gray-600 space-y-1 font-medium' >
      <NavLink to='/' className={({isActive})=>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`} onClick={()=>setSidebarOpen(false)}>
     <Home className='w-5 h-5' />
     <label>Feed</label>
      </NavLink>
      <NavLink to='/messages' className={({isActive})=>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`} onClick={()=>setSidebarOpen(false)}>
     <MessageCircle className='w-5 h-5' />
     <label>Messages</label>
      </NavLink>
      <NavLink to='/discover' className={({isActive})=>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`} onClick={()=>setSidebarOpen(false)}>
     <Search className='w-5 h-5' />
     <label>Discover</label>
      </NavLink>
      <NavLink to='/profile' className={({isActive})=>`px-3.5 py-2 flex items-center gap-3 rounded-xl ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'}`} onClick={()=>setSidebarOpen(false)}>
     <User className='w-5 h-5' />
     <label>Profile</label>
      </NavLink>
    </div>
  )
}

export default MenuItems
