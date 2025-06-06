
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox(){
    let [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username.trim()){
            navigate(`/user/${username}`);
        }
    };

    

    return(
        <div className="w-full h-110 flex flex-col justify-center items-center font-inter leading-12">
            <h1 className="text-black font-bold tracking-tight text-[42px]">Developer dashboard</h1>
            <h1 className="text-lgrey font-bold tracking-tight text-[40px] mb-15">Track GitHub activity</h1>
            <div className="w-60 h-10 flex justify-between items-center rounded-full shadow">
                    <input value={username} onChange={ (e) => {setUsername(e.target.value)}} className="w-40 h-10 text-sm px-4 rounded-full focus:outline-none focus:ring-0 focus:border-transparent" type="text" placeholder="Search..."/>
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="h-9 w-9 mr-2 rounded-full bg-black flex justify-center items-center text-white text-[6px]"><FontAwesomeIcon icon={faGithub} className="text-xl"/></button>
                </form>
            </div>
            
        </div>
    )

}

