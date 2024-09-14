import React from 'react'
import {GoogleAuthProvider, getAuth,signInWithPopup }from 'firebase/auth'
import { analytics, app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
const GoogleAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClickGoogle = async()=>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)
            console.log(result)
            const res = await fetch('https://mern-app2-w0yi.onrender.com/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({username:result.user.displayName,email:result.user.email})
                

            })
            const data = await res.json()
                
            dispatch(signInSuccess(data))
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }
  return (
    <button onClick = {handleClickGoogle}className='bg-red-800 text-white p-2 rounded-lg hover:bg-red-900'>Sign in with Google</button>
  )
}

export default GoogleAuth
