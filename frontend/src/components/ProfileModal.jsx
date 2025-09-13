import React, { useState } from 'react'
import {Pencil} from 'lucide-react'
const ProfileModal = ({setShowEdit}) => {
    const user = {}
    const [editForm,setEditForm] = useState({
        username : user.username,
        bio:user.bio,
        location:user.location,
        profile_picture: null,
        cover_photo: null,
        full_name:user.full_name
    });
    const handleSaveProfile = async(e)=>{
        e.prefentDefault();
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-110 overflow-y-scroll bg-black/50' >
    <div className='max-w-2xl sm:py-6 mx-auto' >
    <div className='bg-white rounded-lg shadow p-6' >
    <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>
    <form className='space-y-4' onSubmit={handleSaveProfile}>
    <div className='flex flex-col items-start gap-3' >
      <label htmlFor="profile_picture" className='block text-sm font-medium text-gray-700 mb-1'>
        Profile Picture
        
        <input hidden type="file" accept='image/*' id='profile_picture' onChange={(e)=>setEditForm({...editForm,profile_picture:e.target.files[0]})} className='w-full p-3 border border-gray-200 rounded-lg' />
        <div className='group/profile relative' >
          <img className='w-24 h-24 rounded-full object-cover mt-2' src={editForm.profile_picture ? URL.createObjectURL(editForm.profile_picture) : user.profile_picture} alt="" />
          <div className='absolute  hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center' >
            <Pencil className='w-5 h-5 text-white' />
          </div>
        </div>
      </label>
    </div>
    <div className='flex flex-col items-start gap-3 '>
    <label htmlFor="cover_photo" className='block text-sm font-medium text-gray-700 mb-1' >
      Cover photo
       <input hidden type="file" accept='image/*' id='cover_photo' onChange={(e)=>setEditForm({...editForm,cover_photo:e.target.files[0]})} className='w-full p-3 border border-gray-200 rounded-lg' />
      <div className='group/cover relative' >
        <img src={editForm.cover_photo ? URL.createObjectURL(editForm.cover_photo ) : user.cover_photo} className='w-80 h-40 rounded-lg bg-gradient-to-r  from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2' alt="" />
        <div className='absolute  hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center' >
          <Pencil className='w-5 h-5 text-white' />
        </div>
      </div>
    </label>
    </div>
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        Name
        <input type="text" onChange={(e)=>setEditForm({...editForm,full_name:e.target.value})} value={editForm.full_name} className='w-full p-3 border border-gray-200 rounded-lg'  placeholder='Please enter your full name' />
      </label>
    </div>
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        Username
        <input type="text" onChange={(e)=>setEditForm({...editForm,username:e.target.value})} value={editForm.username} className='w-full p-3 border border-gray-200 rounded-lg'  placeholder='Please enter a username' />
      </label>
    </div>
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        Bio
        <textarea rows={3} type="text" onChange={(e)=>setEditForm({...editForm,bio:e.target.value})} value={editForm.bio} className='w-full p-3 border border-gray-200 rounded-lg'  placeholder='Please enter a bio' />
      </label>
    </div>
        <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        Location
        <input type="text" onChange={(e)=>setEditForm({...editForm,location:e.target.value})} value={editForm.location} className='w-full p-3 border border-gray-200 rounded-lg'  placeholder='Please enter your Location' />
      </label>
    </div>
    <div className='flex justify-end space-x-3 pt-6' >
    <button onClick={()=>setShowEdit(false)} type='button' className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors' >Cancel</button>
    <button  type='submit' className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer' >Save Changes </button>

    </div>
    </form>
    </div>
    </div>
      
    </div>
  )
}

export default ProfileModal
