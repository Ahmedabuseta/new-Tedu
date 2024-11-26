
'use client'
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { signIn} from "next-auth/react"
const GoogleAuthButton: React.FC = () => {

  return (
    <button onClick={() => signIn("google")}  className='mt-4 bg-blue-500 text-white border-none py-2 px-4 rounded cursor-pointer text-lg font-sans flex items-center justify-center shadow-md transition duration-300 ease-in-out hover:bg-blue-600'>
      <FaGoogle />
       Sign in with Google
    </button>
  );
};



export default GoogleAuthButton;
