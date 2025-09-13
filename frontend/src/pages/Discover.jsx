import { Search } from 'lucide-react'
import React, { useState } from 'react'

const Discover = () => {
  // user === data
  const [input,setInput] = useState('')
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const handleSearch = async(e)=>{
    if(e.key ==='Enter'){
      setData([]);
      setLoading(true);
      setTimeout(() => {
        setData([])
        setLoading(false);
      }, 1000);
    }
  }
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
    <div className='max-w-6xl mx-auto p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900 mb-2'>Discover Things ...</h1>
        <p className='text-slate-600'>Find the items of your campus ... </p>
      </div>.
      <div className='mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80'>
        <div className='p-6'>
        <div className='relative'>
          <Search className='absolute  left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
          <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyUp={handleSearch} type='text' placeholder='Search by people, category or by name ...' className='pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm'/>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Discover
