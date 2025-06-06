import React from 'react';
import '../index.css'

function Navbar(){



    return (
        <nav className='w-full h-10 flex justify-between items-center pt-2'>
            <ul className='flex space-x-8 ml-20 font-inter'>
                <li><a href="/" className='font-bold'>Dashflow®</a></li>
                <li><a href="/" className='text-lgrey'>Home</a></li>
                <li><a href="/repo" className='text-lgrey'>Repositories</a></li>
                <li><a href="/trending" className='text-lgrey'>Trending</a></li>
            </ul>
            <button className='h-7 w-34 text-[14px] bg-black text-white mr-20 rounded-full font-inter'>Connect GitHub</button>
        </nav>
    )
}

export default Navbar