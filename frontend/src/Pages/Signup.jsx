import { React, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Signup = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
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
        // console.log(data)
        navigate('/login')
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-10'>Sign-up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 ' >
                <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
                <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <button className='bg-slate-600 text-white p-3 rounded-lg hover:bg-slate-800 '>Signup</button>
            </form>
            <div className='flex gap-3 justify-end p-3'>
                <p>Already a user?</p>
                <Link to={"/login"}>
                    <span className='text-blue-900 onChange = {handleChange}'>Login</span>
                </Link>
            </div>
        </div>
    )
}

export default Signup
