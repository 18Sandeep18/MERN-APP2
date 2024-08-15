import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='bg-slate-800'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-white'>Sandeep</span>
                    <span className='text-gray-400'>Com's</span>
                </h1>

                <form action="" className='bg-slate-700 rounded-lg p-1 flex items-center'>
                    <input 
                        type="text" 
                        placeholder='Search Something...' 
                        className='bg-transparent focus:outline-none text-white placeholder-gray-400' 
                    />
                    <FaSearch className='text-gray-400' />
                </form>

                <ul className='text-white flex gap-5 cursor-pointer'>
                    <Link to='/'>
                        <li className='hover:text-blue-400 transition-colors'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hover:text-blue-400 transition-colors'>About</li>
                    </Link>
                    <Link to='/login'>
                        <li className='hover:text-blue-400 transition-colors'>Login</li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
