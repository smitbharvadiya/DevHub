import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { detectGitHubEntityType } from "../api/githubGraphQL";
import { useState } from 'react';
import { useEffect } from "react";

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
                    <div className="w-full md:flex-1 flex justify-between items-center py-4 px-6 sm:pl-10">
                        <div>
                            <p className="font-oswald text-3xl sm:text-4xl pb-2">{user.followers?.totalCount.toLocaleString()}</p>
                            <p className="font-poppins">Followers</p>
                        </div>
                        <div>
                            <p className="font-oswald text-3xl sm:text-4xl pb-2">{user.following?.totalCount.toLocaleString()}</p>
                            <p className="font-poppins">Following</p>
                        </div>
                        <div>
                            <p className="font-oswald text-3xl sm:text-4xl pb-2">{user.repositories?.totalCount}</p>
                            <p className="font-poppins">Repos</p>
                        </div>
                    </div>) :
                    (
                        <div className="flex justify-between items-center w-100 ml-20">
                            <div>
                                <p className="font-oswald text-3xl sm:text-4xl pb-2">{user.repositories?.totalCount}</p>
                                <p className="font-poppins">Repositories</p>
                            </div>
                            <div>
                                <p className="font-oswald text-3xl sm:text-4xl pb-2">{user.repositories?.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0)}</p>
                                <p className="font-poppins">Total Stars</p>
                            </div>
                            <div>
                                <p className="font-oswald text-3xl sm:text-4xl pb-2">{user.membersWithRole?.totalCount}</p>
                                <p className="font-poppins">Members</p>
                            </div>
                        </div>
                    )}

            </div>

            <div className="flex justify-between flex-wrap px-4 sm:px-8 py-3 gap-y-2 text-sm">

                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                    {user.location && <p className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-gray-500" />
                        {user.location}
                    </p>}
                    {user.email && <p className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                        {user.email}
                    </p>}
                    {user.websiteUrl && <p className="flex items-center text-gray-700"> 🔗 {" "}
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
