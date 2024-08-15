import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'

const Signup = () => {
    const [formData, setFormData] = useState({})
    const {loading,error} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart())
        try{

            const res = await fetch('/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                }
            )
            const data = await res.json();
            console.log(data.success)

            if(data.success === false){
                console.log(data.msg)
                dispatch(signInFailure(data.msg))
                return;
            }
            else{
                dispatch(signInSuccess(data))
                navigate('/')
            }   
        }
        catch(err){
            dispatch(signInFailure(err.message))

        }
    }

    return (
        <div className='bg-slate-800 mt-16 p-7 rounded-lg max-w-lg mx-auto text-white'>
            <h1 className='text-3xl text-center font-semibold my-10'>Login-in</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 ' >
                
                <input 
                    type="text" 
                    placeholder='Email' 
                    className='bg-slate-700 text-white placeholder-gray-400 p-3 rounded-lg' 
                    id='email' 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    className='bg-slate-700 text-white placeholder-gray-400 p-3 rounded-lg' 
                    id='password' 
                    onChange={handleChange} 
                />
                <button disabled= {loading} className='bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors'>
                    {loading ? 'Loading...':'Login'}
                </button>
            </form>
            <div className='flex gap-3 justify-end p-3'>
                <p>Dont have an account?</p>
                <Link to={"/signup"}>
                    <span className='text-blue-400 hover:text-blue-600 transition-colors'>SignUp</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default Signup
