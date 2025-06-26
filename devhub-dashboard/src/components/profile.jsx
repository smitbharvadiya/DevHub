import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { detectGitHubEntityType } from "../api/githubGraphQL";
import { useState } from 'react';
import { useEffect } from "react";
import { faUserFriends, faUserPlus, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Profile({ user }) {

    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const fetchUserType = async () => {
            if (user && user.login) {
                try {
                    const type = await detectGitHubEntityType(user.login);
                    setUserType(type);
                } catch (err) {
                    console.error("Failed to get user type", err);
                }
            }
        };

        fetchUserType();
    }, [user]);

    return (
        <div className="mx-4 sm:mx-6 my-3 rounded-xl shadow-md bg-white">

            <div className="flex flex-col md:flex-row">

                <div className="w-full sm:w-60 flex flex-col justify-center items-center px-6 pt-6 pb-4">
                    <img src={user.avatarUrl} alt="Avatar" className="w-28 h-28 rounded-full" />
                    <h1 className="font-bold mt-4 sm:mt-2 leading-4">{user.name}</h1>
                    <p className="text-gray-600">@{user.login}</p>
                </div>

                {/* Stats */}
                {userType === 'User' ? (
                    <div className="w-full flex flex-row justify-between items-center px-4 py-4 gap-3">
                        {/* Followers */}
                        <div className="w-1/3 text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                            <p className="font-inter text-xl sm:text-4xl pb-1 sm:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 truncate">
                                {user.followers?.totalCount.toLocaleString()}
                            </p>
                            <p className="font-poppins text-gray-600 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-3">
                                <FontAwesomeIcon icon={faUserFriends} className="text-blue-400 text-sm" />
                                Followers
                            </p>
                        </div>

                        {/* Following */}
                        <div className="w-1/3 text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                            <p className="font-inter text-xl sm:text-4xl pb-1 sm:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 truncate">
                                {user.following?.totalCount.toLocaleString()}
                            </p>
                            <p className="font-poppins text-gray-600 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-3">
                                <FontAwesomeIcon icon={faUserPlus} className="text-purple-400 text-sm" />
                                Following
                            </p>
                        </div>

                        {/* Repos */}
                        <div className="w-1/3 text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                            <p className="font-inter text-xl sm:text-4xl pb-1 sm:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500 truncate">
                                {user.repositories?.totalCount}
                            </p>
                            <p className="font-poppins text-gray-600 text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-3">
                                <FontAwesomeIcon icon={faCodeBranch} className="text-green-400 text-sm" />
                                Repos
                            </p>
                        </div>
                    </div>

                ) :
                    (
                        <div className="w-full flex flex-row flex-wrap justify-between items-center gap-3 px-4 py-4">
                            {/* Repositories */}
                            <div className="flex-1 min-w-[100px] text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                                <p className="font-oswald text-xl sm:text-4xl pb-1 sm:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 truncate">
                                    {user.repositories?.totalCount}
                                </p>
                                <p className="font-poppins text-gray-600 text-xs sm:text-sm">Repositories</p>
                            </div>

                            {/* Total Stars */}
                            <div className="flex-1 min-w-[100px] text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                                <p className="font-oswald text-xl sm:text-4xl pb-1 sm:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 truncate">
                                    {user.repositories?.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0)}
                                </p>
                                <p className="font-poppins text-gray-600 text-xs sm:text-sm">Total Stars</p>
                            </div>

                            {/* Members */}
                            <div className="flex-1 min-w-[100px] text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
                                <p className="font-oswald text-xl sm:text-4xl pb-1 sm:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500 truncate">
                                    {user.membersWithRole?.totalCount}
                                </p>
                                <p className="font-poppins text-gray-600 text-xs sm:text-sm">Members</p>
                            </div>
                        </div>

                    )}

            </div>

            <div className="flex justify-between flex-wrap px-4 sm:px-8 py-3 gap-y-2 text-sm bg-gray-50 rounded-b-xl">

                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                    {user.location && <p className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-gray-500" />
                        {user.location}
                    </p>}
                    {user.email && <p className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                        {user.email}
                    </p>}
                    {user.websiteUrl && <p className="flex text-md items-center text-gray-700"> 🔗 {" "}
                        <a href={user.websiteUrl.startsWith("http") ? user.websiteUrl : `https://${user.websiteUrl}`}
                            target="_blank" rel="noopener noreferrer">
                            Blog
                        </a>
                    </p>}

                </div>

                {/* <p>{new Date(user.created_at).toLocaleString()}</p> */}
                <div className="h-8 w-35 border-1 border-black text-black hover:bg-black hover:text-white flex justify-center items-center rounded-full transition-all duration-400 ease-in-out  px-4 py-2">
                    <a href={user.url} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        View GitHub
                    </a>
                </div>
            </div>

        </div>
    )

}
