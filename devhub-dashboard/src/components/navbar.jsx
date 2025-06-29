import { FaBars, FaTimes } from "react-icons/fa";
import '../index.css'
import { useState } from "react";
import LoginButton from './LoginBtn';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='w-full border-b px-4 py-3 overflow-x-hidden bg-white/90'>

            <div className="flex justify-between items-center">
                <a href="/" className='font-bold text-lg'>DevHub®</a>

                <button
                    className="md:hidden text-xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
                
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        <li>
                            <a
                                href="/"
                                className="font-medium text-gray-500 hover:text-black transition-colors duration-200
                  relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                  after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/bookmark"
                                className="font-medium text-gray-500 hover:text-black transition-colors duration-200
                  relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                  after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-300"
                            >
                                Repositories
                            </a>
                        </li>
                    </ul>
                    <div className="ml-4">
                        <LoginButton />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden mt-4 font-inter space-y-2 hover:text-black">
                    <a href="/" className="block text-lgrey hover:text-black">Home</a>
                    <a href="/bookmark" className="block text-lgrey hover:text-black">Repositories</a>
                    <LoginButton />
                </div>)}

        </nav>
    )
}
