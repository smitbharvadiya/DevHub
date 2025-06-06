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
        <div className="mx-6 my-3 rounded-xl shadow-md bg-white">

            <div className="flex">

                <div className="w-60 flex flex-col justify-center items-center mx-6 mt-6 mb-4">
                    <img src={user.avatarUrl} alt="Avatar" className="w-28 h-28 rounded-full" />
                    <h1 className="font-bold mt-2 leading-4">{user.name}</h1>
                    <p className="text-gray-600">@{user.login}</p>
                </div>

                {/* Stats */}
                {userType === 'User' ? (
                    <div className="flex justify-between items-center w-100 ml-20">
                        <div>
                            <p className="font-oswald text-4xl pb-2">{user.followers?.totalCount.toLocaleString()}</p>
                            <p className="font-poppins">Followers</p>
                        </div>
                        <div>
                            <p className="font-oswald text-4xl pb-2">{user.following?.totalCount.toLocaleString()}</p>
                            <p className="font-poppins">Following</p>
                        </div>
                        <div>
                            <p className="font-oswald text-4xl pb-2">{user.repositories?.totalCount}</p>
                            <p className="font-poppins">Repos</p>
                        </div>
                    </div>) :
                    (
                        <div className="flex justify-between items-center w-100 ml-20">
                            <div>
                                <p className="font-oswald text-4xl pb-2">{user.repositories?.totalCount}</p>
                                <p className="font-poppins">Repositories</p>
                            </div>
                            <div>
                                <p className="font-oswald text-4xl pb-2">{user.repositories?.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0)}</p>
                                <p className="font-poppins">Total Stars</p>
                            </div>
                            <div>
                                <p className="font-oswald text-4xl pb-2">{user.membersWithRole?.totalCount}</p>
                                <p className="font-poppins">Members</p>
                            </div>
                        </div>
                    )}

            </div>

            <div className="flex justify-between">

                <div className="flex">
                    {user.location && <p className="ml-8 x-6">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-gray-500" />
                        {user.location}
                    </p>}
                    {user.email && <p className="mx-6">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                        {user.email}
                    </p>}
                    {user.websiteUrl && <p className="mx-6"> 🔗 {" "}
                        <a href={user.websiteUrl.startsWith("http") ? user.websiteUrl : `https://${user.websiteUrl}`}
                            target="_blank" rel="noopener noreferrer">
                            Blog
                        </a>
                    </p>}

                </div>

                {/* <p>{new Date(user.created_at).toLocaleString()}</p> */}
                <div className="h-8 w-35 bg-black text-white hover:bg-[#404040] flex justify-center items-center rounded-full  mr-4 mb-2">
                    <a href={user.url} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        View GitHub
                    </a>
                </div>
            </div>

        </div>
    )

}
