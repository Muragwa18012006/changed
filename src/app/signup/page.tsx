"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from "axios"
import {toast } from "react-hot-toast"

const SignPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${"https://changed.vercel.app"}/api/users/signup`, user)
      console.log(response.data)
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">usernames</label>
      <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
       type="text" value={user.username} id="username" onChange={(e)=> setUser(
        {...user, username: e.target.value}
      )} placeholder='username' />

<label htmlFor="email">email</label>
      <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
       type="text" value={user.email} id="email" onChange={(e)=> setUser(
        {...user, email: e.target.value}
      )} placeholder='email' />

<label htmlFor="password">password</label>
      <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
       type="password" value={user.password} id="password" onChange={(e)=> setUser(
        {...user, password: e.target.value}
      )} placeholder='password' />
      <button onClick={onSignup}
       className='p-2 border border-gray-300
      rounded-lg mb-4 focus:outline-none focus:border-gray
      -600'>{buttonDisabled ? "No signup" : "Signup"}</button>
      <Link href='/login'>Visit login page</Link>
    </div>
  )
}

export default SignPage