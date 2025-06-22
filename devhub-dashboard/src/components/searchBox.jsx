
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
    let [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.trim()) {
            navigate(`/user/${username}`);
        }
    };



    return (
        <div className="overflow-x-hidden w-full min-h-screen flex flex-col items-center font-inter leading-12 pt-32">
            <h1 className="text-black font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl">Developer dashboard</h1>
            <h1 className="text-lgrey font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl mt-2 mb-18">Track GitHub activity</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex justify-between items-center rounded-full shadow px-2 py-1 w-[260px] sm:w-[300px]">
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} className="flex-grow text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-0 focus:border-transparent" type="text" placeholder="Search..." />
                    <button type="submit" className="min-w-[30px] min-h-[30px] sm:min-w-[36px] sm:min-h-[36px] rounded-full bg-black flex justify-center items-center text-white"><FontAwesomeIcon icon={faGithub} className="text-lg" /></button>
                </div>
            </form>

        </div>
    )

}

