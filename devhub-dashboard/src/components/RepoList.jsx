import { useState, useMemo } from "react";
import FolderMenu from "./folderMenu";
import { auth } from "../../firebase";
import { useEffect } from "react";

export default function RepoList({ repos }) {

    const [sortType, setSortType] = useState("UPDATED_AT");
    const [showFolder, setShowFolder] = useState(false);
    const [selectedRepos, setSelectedRepos] = useState([]);

    const sortedRepo = useMemo(() => {
        switch (sortType) {
            case "STAR": return [...repos].sort((a, b) => b.stargazerCount - a.stargazerCount);
            case "UPDATED_AT": return [...repos].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            case "FORKED": return [...repos].sort((a, b) => b.forkCount - a.forkCount);
            case "HIDDEN-GEM": return [...repos]
                .filter(repo => repo.stargazerCount < 10)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 3);
            default: return repos;
        }
    }, [sortType, repos]);

    const checkLogin = () => {
        if (!auth.currentUser) {
            alert("Please log in to bookmark repos");
        } else {
            setShowFolder(true);
        }
    }

    useEffect(() => {
        if (showFolder) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showFolder]);

    const handleCheckboxChange = (e, repo) => {
        if (e.target.checked) {
            setSelectedRepos((prev) => [...prev, {
                id: repo.id,
                name: repo.name,
                url: repo.url,
                description: repo.description,
                stargazerCount: repo.stargazerCount,
                forkCount: repo.forkCount,
                updatedAt: repo.updatedAt,
            }]);
        } else {
            setSelectedRepos((prev) => prev.filter((r) => r.id !== repo.id));
        }
    }

    return (
        <div className="bg-white mx-6 my-3 px-6 rounded-xl shadow-md">
            <h2 className="font-bold text-2xl mx-4 pt-4 text-gray-800">Public Repositories</h2>
            <div className="flex items-center justify-end mb-2 mr-8">
                <label className="mr-2 font-medium text-sm text-gray-700">Sort by:</label>
                <select value={sortType} onChange={(e) => setSortType(e.target.value)}
                    className="border boder-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 ease-in-out">
                    <option value="UPDATED_AT">Recently Updated</option>
                    <option value="STAR">Most Stars</option>
                    <option value="FORKED">Most Forked</option>
                    <option value="HIDDEN-GEM">Hidden Gems</option>
                </select>
            </div>
            <div className="grid grid-cols-8 gap-6 bg-gray-100 rounded-t-md font-semibold border-b pb-2 font-poppins px-6 py-4">
                <span>🔖</span>
                <span className="col-span-2">Name</span>
                <span className="col-span-2">Description</span>
                <span>Star</span>
                <span>Forks</span>
                <span>Last Updated</span>
            </div>

            <div className="pb-6 h-100 overflow-y-auto border-1 rounded-b-md">

                {sortedRepo.map((repo) => (

                    <div key={repo.id} className=" grid grid-cols-8 gap-6  border-b last:border-none hover:bg-gray-50 p-6 ">
                        <input
                            className="h-5 justify-self-start"
                            type="checkbox"
                            checked={selectedRepos.some((r) => r.id === repo.id)}
                            onChange={(e) => handleCheckboxChange(e, repo)}
                        />
                        <a
                            href={repo.url}
                            className="col-span-2 hover:underline text-blue-600 font-medium truncate"
                            target="_blank"
                            rel="noopener noreferrer" >
                            {repo.name}
                        </a>
                        <p className="col-span-2 text-sm text-gray-700 truncate line-clamp-1">{repo.description || "No Description Provided"}</p>
                        <span className="text-sm text-gray-600 pl-4">{repo.stargazerCount.toLocaleString()}</span>
                        <span className="text-sm text-gray-600 pl-4">{repo.forkCount.toLocaleString()}</span>
                        <span className="text-sm text-gray-600 pl-6">{new Date(repo.updatedAt).toLocaleDateString()}</span>

                    </div>

                ))}

            </div>
            <button
                onClick={checkLogin}
                className=" px-4 py-1 rounded-full my-4 bg-black text-white hover:bg-gray-700 transition-all duration-300 ease-in-out">
                Bookmark Repo
            </button>
            {showFolder && <FolderMenu onClose={() => setShowFolder(false)} selectedRepos={selectedRepos} />}
        </div>
    )
}