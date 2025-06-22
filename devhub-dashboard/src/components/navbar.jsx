import { FaBars, FaTimes } from "react-icons/fa";
import '../index.css'
import { useState } from "react";
import LoginButton from './LoginBtn';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='w-full border-b px-4 py-3 overflow-x-hidden'>

            <div className="flex justify-between items-center">
                <a href="/" className='font-bold text-lg'>Dashflow®</a>

                <button
                    className="md:hidden text-xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
                <div className="hidden md:flex items-center space-x-8 font-inter">
                    <ul className='flex space-x-8'>
                        <li><a href="/" className='text-lgrey'>Home</a></li>
                        <li><a href="/bookmark" className='text-lgrey'>Repositories</a></li>
                        <li><a href="/trending" className='text-lgrey'>Trending</a></li>
                    </ul>
                    <LoginButton />
                </div>
            </div>

            {isOpen && (
        <div className="md:hidden mt-4 font-inter space-y-2">
          <a href="/" className="block text-lgrey hover:text-black">Home</a>
          <a href="/bookmark" className="block text-lgrey hover:text-black">Repositories</a>
          <a href="/trending" className="block text-lgrey hover:text-black">Trending</a>
     
        <LoginButton />
      </div>)}

        </nav>
    )
}
