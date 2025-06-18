import React from 'react';
import '../index.css'
import LoginButton from './LoginBtn';

export default function Navbar(){

    return (
        <nav className='w-full h-10 flex justify-between items-center pt-2'>
            <ul className='flex space-x-8 ml-20 font-inter'>
                <li><a href="/" className='font-bold'>Dashflow®</a></li>
                <li><a href="/" className='text-lgrey'>Home</a></li>
                <li><a href="/bookmark" className='text-lgrey'>Repositories</a></li>
                <li><a href="/trending" className='text-lgrey'>Trending</a></li>
            </ul>
            <LoginButton/>
        </nav>
    )
}
