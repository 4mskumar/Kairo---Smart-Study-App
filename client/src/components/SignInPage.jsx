import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='w-[115%] h-screen flex justify-center items-center'><SignIn path='/signin' routing='path' signInUrl='/signup'/></div>
  )
}

export default SignInPage