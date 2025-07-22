
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
    let [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim()) return;

        setError("");

        try {
            const res = await fetch(`https://api.github.com/users/${username.trim()}`);
            if (res.status === 200) {
                navigate(`/user/${username.trim()}`);
            } else if (res.status === 404) {
                setError("User not found. Please enter a valid GitHub username.");
            } else {
                setError("Something went wrong. Try again later.");
            }
        } catch (err) {
            setError("Failed to connect to GitHub. Check your connection.");
        }
    };



    return (
        <div className="overflow-x-hidden w-full min-h-screen flex flex-col items-center font-inter leading-12 pt-24 box-border">
            <h1 className="text-black font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl">Developer dashboard</h1>
            <h1 className="text-lgrey font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl pt-2 pb-12">Track GitHub activity</h1>
            <form onSubmit={handleSubmit} className="pb-4">
                <div className="flex justify-between items-center rounded-full shadow px-2 py-1 w-[260px] sm:w-[300px]">
                    <input value={username} onChange={(e) => { setUsername(e.target.value) }} className="flex-grow text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-0 focus:border-transparent w-full h-full" type="text" placeholder="Enter GitHub username..." />
                    <button
                        type="submit"
                        className="min-w-[30px] min-h-[30px] sm:min-w-[36px] sm:min-h-[36px] 
             rounded-full bg-black text-white 
             flex justify-center items-center 
             transition-transform duration-150 ease-in-out 
             active:scale-90"
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-lg" />
                    </button>
                </div>
            </form>

            {error && (
                <p className="text-red-500 text-sm mt-2 max-w-xs text-center">{error}</p>
            )}

            <p className="pt-14 text-gray-500 text-sm text-center max-w-md"
            >Try searching for popular GitHub users like:</p>
            <div className="flex justify-center space-x-4 mt-2">
                <button
                    onClick={() => setUsername("torvalds")}
                    className="text-blue-500 hover:underline cursor-pointer"
                >
                    torvalds
                </button>
                <button
                    onClick={() => setUsername("gaearon")}
                    className="text-blue-500 hover:underline cursor-pointer"
                >
                    gaearon
                </button>
                <button
                    onClick={() => setUsername("addyosmani")}
                    className="text-blue-500 hover:underline cursor-pointer"
                >
                    addyosmani
                </button>
            </div>

        </div>
    )

}

