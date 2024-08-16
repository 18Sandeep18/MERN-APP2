import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector(state => state.user)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null) // Create a reference for the dropdown

    // Toggle the dropdown when the username is clicked
    const handleDropdownToggle = () => {
        setIsDropdownOpen(prevState => !prevState)
    }

    // Close the dropdown if clicked outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false)
        }
    }

    useEffect(() => {
        if (isDropdownOpen) {
            window.addEventListener('click', handleClickOutside)
        } else {
            window.removeEventListener('click', handleClickOutside)
        }

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [isDropdownOpen])

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

                <ul className='text-white flex gap-5 cursor-pointer relative'>
                    <Link to='/'>
                        <li className='hover:text-blue-400 transition-colors'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hover:text-blue-400 transition-colors'>About</li>
                    </Link>
                    <div className='relative' ref={dropdownRef}>
                        {currentUser ? (
                            <div
                                className='text-slate-300 hover:text-blue-400 transition-colors'
                                onClick={handleDropdownToggle}
                            >
                                {currentUser.username}
                            </div>
                        ) : (
                            <Link to='/login'>
                                <li className='hover:text-blue-400 transition-colors'>Login</li>
                            </Link>
                        )}

                        {isDropdownOpen && currentUser && (
                            <div className='absolute right-0 mt-1 w-48 bg-slate-800 rounded-lg shadow-lg p-3 text-white'>
                                <Link
                                    to='/profile'
                                    className='block bg-slate-700 rounded-lg text-white placeholder-gray-400 p-3 my-1 hover:bg-slate-600 transition-colors'
                                >
                                    Profile
                                </Link>
                                <Link
                                    to='/logout'
                                    className='block bg-slate-700 rounded-lg text-white placeholder-gray-400 p-3 my-1 hover:bg-slate-600 transition-colors'
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
        </header>
    )
}

export default Header
