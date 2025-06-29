// devhub-dashboard/src/components/NotFound.jsx

import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex items-center justify-evenly min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-200 text-gray-800 px-6">
            <div className='flex flex-col'>
                <h1 className="text-6xl font-extrabold mb-2">404</h1>
                <p className="text-2xl font-semibold mb-2">Page Not Found</p>
                <p className="text-center text-gray-600 mb-6">
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                </p>
                <a href="/">
                    <button className="bg-[#4392fd] text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md transition-all duration-200 cursor-pointer">
                        Go Home
                    </button>
                </a>
            </div>

            <div className="mt-10">
                <img
                    src="https://illustrations.popsy.co/blue/timed-out-error.svg"
                    alt="Not Found Illustration"
                    className="w-80 sm:w-96"
                />
            </div>
        </div>
    );
}
