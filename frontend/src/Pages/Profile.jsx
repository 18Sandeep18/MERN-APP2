import {React,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { updateUserstart,updateUserSucess,updateUserFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess ,logoutUserStart,logoutUserFailure,logoutUserSuccess} from '../redux/user/userSlice.js'

const Profile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [formData,setFormData] = useState({})
    const dispatch = useDispatch()
    const [updateSuccess,setUpdateSucces] = useState(false)
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    // User need to be updated in the form of currentUser and no one will get access...it comes with practice

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            dispatch(updateUserstart())
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'Application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success === false){
                dispatch(updateUserFailure(data.msg))
                return
            }
            dispatch(updateUserSucess(data))
            setUpdateSucces(true)

        }catch(err){
            dispatch(updateUserFailure(err.message))
        }

    }
    const handleDeleteUser = async ()=>{
        try{
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method:'DELETE'

            })
                const data = res.json()
                if(data.success === false){
                    dispatch(deleteUserFailure(data.msg))
                }
                dispatch(deleteUserSuccess(data))

        }catch(err){
            dispatch(deleteUserFailure(err.message))
        }
    }
    const handleLogout = async()=>{
        try{
            dispatch(logoutUserStart())
            const res = await fetch('/api/auth/logout')
            const data = res.json()
            if(data.success === false){
                dispatch(deleteUserFailure(data.msg))
                return; 
            }
            dispatch(deleteUserSuccess(data))
        }catch(err){
            dispatch(deleteUserFailure(err.message))
        }
    }
    return (
        <div className='bg-slate-800 p-6 mt-16 rounded-lg max-w-sm mx-auto text-white'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

            <form onSubmit = {handleSubmit} className='flex flex-col gap-4'>
                <input 
                    type="text" 
                    placeholder='Username' 
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                    id = "username"
                    className='bg-slate-700 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none' 
                />
                <input 
                    type="text" 
                    placeholder='Email' 
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    id = "email"
                    className='bg-slate-700 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none' 
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    onChange={handleChange}
                    id = 'password'
                    className='bg-slate-700 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none' 
                />
                <button className='bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors'>
                    Update
                </button>
            </form>

            <div className='flex justify-between mt-4'>
                <span onClick = {handleDeleteUser}className='text-red-500 cursor-pointer hover:text-red-700 transition-colors'>
                    Delete account
                </span>
                <span onClick={handleLogout} className='text-blue-400 cursor-pointer hover:text-blue-600 transition-colors'>
                    Logout
                </span>
            </div>
            <p className='text-green-400 mt-4'>{updateSuccess?"User updated Succesfully":''}</p>
            
        </div>
    )
}

export default Profile
