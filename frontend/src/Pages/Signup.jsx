import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleAuth from '../Components/GoogleAuth'

const Signup = () => {
    const [formData, setFormData] = useState({})
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{

            const res = await fetch('/api/auth/signup',
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
                setError(data.msg)
                setLoading(false)
                return
            }
            setLoading(false)
            setError(null)
            navigate('/login')
        }
        catch(error){
            setError(error.message)
            setLoading(false)

        }
    }

    return (
        <div className='bg-slate-800 mt-16 p-5 rounded-lg max-w-lg mx-auto text-white'>
            <h1 className='text-3xl text-center font-semibold my-10'>Sign-up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 ' >
                <input 
                    type="text" 
                    placeholder='Username' 
                    className='bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg' 
                    id='username' 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    placeholder='Email' 
                    className='bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg' 
                    id='email' 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    className='bg-slate-700 text-white placeholder-gray-400 p-2 rounded-lg' 
                    id='password' 
                    onChange={handleChange} 
                />
                <button disabled= {loading} className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    {loading ? 'Loading...':'sign up'}
                </button>
                <GoogleAuth/>
            </form>
            <div className='flex gap-3 justify-end p-2'>
                <p>Already a user?</p>
                <Link to={"/login"}>
                    <span className='text-blue-400 hover:text-blue-600 transition-colors'>Login</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default Signup
